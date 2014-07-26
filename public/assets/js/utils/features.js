var features = [
  'csstransforms3d',
  'touch'
];

features.forEach(function(feature) {
  exports[feature] = Modernizr[feature];
});
