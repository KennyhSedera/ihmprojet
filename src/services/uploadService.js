import Api from '@/services/http-common'

class UploadFilesService {
  upload(file) {
    let formData = new FormData();

    formData.append("Photos", file);

    return Api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default new UploadFilesService();