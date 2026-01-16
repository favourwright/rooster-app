module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'react-native-iconify/babel',
        {
          icons: [
            'solar:home-angle-outline',
            'hugeicons:calendar-02',
            'hugeicons:brochure',
            'hugeicons:user-03',
            // Add more icons here
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
