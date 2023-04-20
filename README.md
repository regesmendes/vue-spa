# vue-spa

This is my minimal pack to start a Vue project.
It was the vue latest version at the time of repository creation (April, 2023), with the following changes:
- Removed cypress (yes, I had choosen it during install);
- Removed the default Vue/Vite view stuff;
- Added [axios](https://axios-http.com/docs/intro);
- Added [tailwindcss](https://tailwindcss.com/);
- Added [font awesome](https://fontawesome.com/);
- Created a menu component to have an easier way to add menu options;
- Created a login/register popup;
- Created a "loading screen" component to present a proper status to the user while running blocking operations, like the authentication;
- Created basic integration with API* register, login and logout routes.

\* Note that this SPA scaffold is intended to work with a Laravel API with the default breeze API routes.
Please, refer to [laravel-api](https://github.com/regesmendes/laravel-api) for more details about the API.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Contact
Feel free to get in touch for comments, suggestions or questions.