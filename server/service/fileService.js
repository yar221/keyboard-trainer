const uuid = require('uuid')
const path = require('path') 

class FileService{

    ext(name) {
        var m = name.match(/\.([^.]+)$/)
        return m && m[1]
    }

    saveImage(file){
        try {
            const fileName = uuid.v4() + '.' + this.ext(file.name)
            const filePath = path.resolve('static', fileName)
            file.mv(filePath)
            
            return fileName
        }catch (e){
            console.log(e.message)
        }
    }

    async deleteImage(){

    }
}

module.exports = new FileService()