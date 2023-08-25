import axios from "axios"
// import sha1 from '../../node_modules/sha1/sha1'

class FileServive {
    static uploadAvatar(avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "a09ikbyc");
        return axios.post('https://api-ap.cloudinary.com/v1_1/dtxyz2s1g/image/upload', formData);
    }

    // static destroyAvatar(filename) {
    //     const timestamp = new Date().getTime();
    //     const public_id = filename;
    //     const api_key = "338315595645698";
    //     const api_secret_key = "ymunfk97k5CSvTXtHkL5PSTWCJ4";
    //     const shaString = `public_id=${public_id}&timestamp=${timestamp}${api_secret_key}`;
    //     const signature = sha1(shaString)
    //     const formData = new FormData();
    //     formData.append("public_id", public_id);
    //     formData.append("signature", signature);
    //     formData.append("api_key", api_key);
    //     formData.append("timestamp", timestamp);
    //     return axios.post('https://api-ap.cloudinary.com/v1_1/dtxyz2s1g/image/destroy', formData);
    // }
}

export default FileServive;