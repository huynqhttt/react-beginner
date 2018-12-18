export const parameters = {
    requestHeader: {
        headers: {
            'Accept': 'application/json, application/xml, text/play, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'
        }
    },
    uploadedHeaders: {
        headers: {
            'Accept': 'application/json, application/xml, text/play, text/html, *.*',
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
}
