// Step 1 of 2 for the hero portrait (macOS only): swift scripts/portrait/cutout.swift <photo.jpg> <cutout.png>
// Lifts the subject out of a photo with Apple's on-device Vision model and writes a PNG with alpha.
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])

guard let image = CIImage(contentsOf: input, options: [.applyOrientationProperty: true]) else {
  fatalError("cannot read \(input.path)")
}
let handler = VNImageRequestHandler(ciImage: image)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else { fatalError("no subject found") }
print("instances:", result.allInstances.count)

// Keep the instance under the centre of the frame (the person), not the lamp or the mirror frame.
let mask = result.instanceMask
CVPixelBufferLockBaseAddress(mask, .readOnly)
let w = CVPixelBufferGetWidth(mask), h = CVPixelBufferGetHeight(mask)
let row = CVPixelBufferGetBytesPerRow(mask)
let base = CVPixelBufferGetBaseAddress(mask)!.assumingMemoryBound(to: UInt8.self)
var counts: [UInt8: Int] = [:]
for y in stride(from: h / 3, to: h * 2 / 3, by: 1) {
  for x in stride(from: w / 3, to: w * 2 / 3, by: 1) {
    let v = base[y * row + x]
    if v != 0 { counts[v, default: 0] += 1 }
  }
}
CVPixelBufferUnlockBaseAddress(mask, .readOnly)
print("centre instances:", counts)
let chosen = IndexSet(counts.filter { $0.value > (w * h / 9) / 20 }.keys.map { Int($0) })
print("keeping:", Array(chosen))

let cut = try result.generateMaskedImage(ofInstances: chosen, from: handler, croppedToInstancesExtent: false)
let ci = CIImage(cvPixelBuffer: cut)
let context = CIContext()
guard let cg = context.createCGImage(ci, from: ci.extent) else { fatalError("render failed") }
let dest = CGImageDestinationCreateWithURL(output as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, cg, nil)
CGImageDestinationFinalize(dest)
print("wrote", output.path, cg.width, "x", cg.height)
