module.exports = function (api) {
  const isTest = api.env('test');
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: isTest ? undefined : 'nativewind' }],
      isTest ? undefined : 'nativewind/babel',
    ].filter(Boolean),
  };
};