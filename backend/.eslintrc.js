module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // Permitir variables que comiencen con guión bajo (como _id)
    "no-underscore-dangle": ["error", { allow: ["_id"] }],

    // Permitir el uso de console.log (desactiva la advertencia)
    "no-console": "off",

    // Aceptar cualquier estilo de salto de línea (Windows o Unix)
    "linebreak-style": "off",
  },
};
