// utils.ts

// export const getDefaultImageUrl = () => {
//     return 'https://thingslinker.com/upload_images/foodease/defultForRecipe.png';
// };

// export const getUserDefaultImageUrl = () => {
//     return 'https://thingslinker.com/upload_images/foodease/userDefultImage.png';
// };

export const getDefaultImageUrl = () => {
    return 'https://foodeaseimages.blob.core.windows.net/foodease-images/2024-10-11_11-21-50-defultForRecipe.png';
};

export const getUserDefaultImageUrl = () => {
    return 'https://foodeaseimages.blob.core.windows.net/foodease-images/2024-10-11_11-21-15-userDefultImage.png';
};

export const isValidUrl = (url: string): boolean => {
    //check if a string is a valid URL
    const pattern = new RegExp(
        '^' +
            '(?:(?:(?:https?|ftp):)?\\/\\/)' +
            '(?:\\S+(?::\\S*)?@)?' +
            '(?:' +
            '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
            '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
            '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
            '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
            '|' +
            '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
            '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
            '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
            '\\.?' +
            ')' +
            '(?::\\d{2,5})?' +
            '(?:[/?#]\\S*)?' +
            '$',
        'i',
    );

    return pattern.test(url);
};
