# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

evidences = Evidence.create([{name: "Fingerprints"}, {name: "EMF"}, {name: "Freezing Temps"}, {name: "Spirit Box"}, {name: "Ghost Orbs"}, {name: "Ghost Writing"}])
ghosts = Ghost.create([{name: "Banshee", weaknesses: "Susceptible to the use of a crucifix to cull their aggression.", strengths: "Will focus on one player, especially those who attempt to confront the Banshee alone.", evidence_id: 1}, {name: "Oni", weaknesses: "Onis are easy to find, as they can't resist causing a ruckus when players are nearby.", strengths: "Onis possess the ability to move physical objects around like a Poltergeist, while also sporting the aggression of a Demon. This makes them challenging to gather evidence around without angering them.", evidence_id: 2}, {name: "Yurei", strengths: "Yureis will drop players' sanity while they are looking at it quicker than any other ghost, but can also decrease sanity even when a player is turned away.", weaknesses: "Yureis are vulnerable to Smudge Sticks, and smudging the room successfully will cause the Yurei to remain in place for some time.", evidence_id: 3}, {name: "Demon", strengths: "They can be difficult to gather clues on as they will attack players very frequently.", weaknesses: "Unlike other ghosts, asking a Demon a successful question via the Ouija Board will not lower players' sanity. This makes the Ouija Board a very useful tool against Demons.", evidence_id: 4}, {name: "Shade", strengths: "Shades can be difficult to find, and therefore difficult to collect evidence on.", weaknesses: "There's strength in numbers against a Shade, as they will not attack a group of people.", evidence_id: 5}, {name: "Revenant", strengths: "Revenants will move extremely quickly when they begin attacking, giving players little chance of escaping.", weaknesses: "If players do get the opportunity to hide from a Revenant, it's speed will drastically decrease.", evidence_id: 6}])

p "Created #{Evidence.count} evidences"
p "Created #{Ghost.count} ghosts"