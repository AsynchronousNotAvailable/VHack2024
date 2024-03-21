module.exports = function (api) {
  api.cache(true);

  const presets = ['babel-preset-expo'];
  const plugins = ['react-native-reanimated/plugin'];

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv']
    ]
  };
};
