class Helper {
    static getFilename(fileUrl) {
        return fileUrl.split('/').pop().split('.')[0];
    }

}
export default Helper;