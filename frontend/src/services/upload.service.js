//FETCH
export const uploadService = {
    uploadImg
}
async function uploadImg(ev) {
    //Defining our variables 
    const CLOUD_NAME = 'douunyd0m'
    const UPLOAD_PRESET = 'vff5r7yf'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();

    //Bulding the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET);
    // Sending a post method request to Cloudinarys API
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        const elImg = document.createElement('img');
        const { url } = await res.json()
        elImg.src = url
        document.body.append(elImg)
    } catch (err) {
        console.error(err)
    }

}