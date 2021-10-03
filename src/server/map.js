const { CORRUPTED_CORE } = require("./maps/corrupted core");
const { CRAZY_COSMOS } = require("./maps/crazy cosmos");
const { CROWDED_CAVERN } = require("./maps/crowded cavern");
const { CRAZY_COSMOS_HARD } = require("./maps/crazy cosmos hard");
const { STRANGE_SPACE } = require('./maps/strange space');
const { TIRELESS_TREK } = require('./maps/tireless trek');
const { ARDUOUS_ABYSS } = require("./maps/arduous abyss");

const { METHODICAL_MONASTERY } = require("./maps/methodical monastery")
const { METHODICAL_MONASTERY_HARD } = require("./maps/methodical monastery hard")

const { MONUMENTAL_MIGRATION } = require("./maps/mm");
const { MONUMENTAL_MIGRATION_PLUS } = require("./maps/mm plus");

const { TOILSOME_TRAVERSE } = require("./maps/toilsome traverse");

const { BECOME_SUS } = require("./maps/become sus");
const { ATROCIOUS_ARENA } = require("./maps/atrocious arena");

const map = {
"Corrupted Core": CORRUPTED_CORE,
"Crazy Cosmos": CRAZY_COSMOS,
"Crazy Cosmos Hard": CRAZY_COSMOS_HARD,
"Methodical Monastery": METHODICAL_MONASTERY,
"Crowded Cavern": CROWDED_CAVERN,
"Methodical Monastery Hard": METHODICAL_MONASTERY_HARD,
"Strange Space": STRANGE_SPACE,
"Monumental Migration": MONUMENTAL_MIGRATION,
"Monumental Migration+": MONUMENTAL_MIGRATION_PLUS,
"Toilsome Traverse": TOILSOME_TRAVERSE,
"become sus": BECOME_SUS,
"Atrocious Arena": ATROCIOUS_ARENA,
"Arduous Abyss": ARDUOUS_ABYSS,
"Tireless Trek": TIRELESS_TREK,
}

module.exports = {
	map
};