
const getFish = (length = 10) => fetch('https://www.fishwatch.gov/api/species')
.then(res => res.json())
.then((json) => {
  const fishArr = [];

  console.log(json);
  json.forEach((fish) => {

    const species = fish["Species Name"];
    const imageGal = fish["Image Gallery"];
    const speciesIllustrationPhoto = fish["Species Illustration Photo"];
    const factsMap = {};

    factsMap['Taste'] = fish['Taste'];
    factsMap['Source'] = fish['Source'];

    addFact(fish, 'Scientific Name', factsMap);
    addFact(fish, 'Physical Description', factsMap);
    addFact(fish, 'Health Benefits', factsMap);

    //console.log('factsMap = ');
    //console.log(factsMap);

    if (species && imageGal && !!imageGal.length) {
      const newFish = {species: species, img: speciesIllustrationPhoto.src, facts: factsMap};
      fishArr.push(newFish);
    }
  })
  return fishArr.splice(0, length);
})
.catch((e) => console.log(e + ' and there was some kind of error'));

function addFact(fish, property, factsMap) {
  if (fish['Health Benefits']) {
    factsMap['Health Benefits'] = `<p>${fish['Health Benefits']}</p>`;
  }
}
export default getFish;