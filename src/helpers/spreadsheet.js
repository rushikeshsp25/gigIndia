import config from "../config";

export function loadSpreadSheet(callback, spreadsheetId) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: spreadsheetId || config.spreadsheetId,
                range: "Sheet1!A1:F9"
            })
            .then(
                response => {
                    const data = response.result.values;
                    console.log("Sheet data received : ", data);
                    callback(data);
                }
            );
    });
}