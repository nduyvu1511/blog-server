import express from "express"
import { cloudinary } from "../../config/cloudinary"

class UploadController {
  async uploadImage(req: express.Request, res: express.Response) {
    try {
      const { base64Str, folder } = req.body
      const uploadResponse = await cloudinary.uploader.upload(base64Str, {
        folder,
      })

      return res.json({
        message: "Upload image successfully",
        success: true,
        data: {
          url: uploadResponse.url,
          assetId: uploadResponse.asset_id,
        },
      })
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
export default new UploadController()
