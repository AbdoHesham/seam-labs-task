export enum buildModeConfig {
    Local,
    Test,
    Prod,
}

var baseUrl = "";

export const buildMode: buildModeConfig =
    buildModeConfig.Test as buildModeConfig;

if (buildMode == buildModeConfig.Local) {
    // baseUrl = "http://localhost:5204";
} else if (buildMode == buildModeConfig.Test) {
    baseUrl = "https://fakestoreapi.com";
} else {
    // baseUrl = "";
}

export const BaseURL = baseUrl;