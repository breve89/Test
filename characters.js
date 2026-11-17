/* =========================================================
   STAR WARS CHARACTERS: canon + Legends profiles
   Text written for Fan HQ. Canon = the official continuity since
   April 2014. Legends = the pre-2014 Expanded Universe.
   ========================================================= */
(function(){
"use strict";
const NOLEG="This character was created after Lucasfilm's 2014 reset, so there is no Legends version.";
const C=[
{n:"Luke Skywalker",aff:"Jedi",era:"Original trilogy",species:"Human",home:"Tatooine",first:"A New Hope (1977)",saber:"Luke Skywalker",
 canon:{bio:"Luke is the son of Anakin Skywalker and Padmé Amidala. He was hidden on Tatooine with his aunt and uncle, Owen and Beru Lars. After they were killed, he joined the Rebellion, destroyed the first Death Star, and trained under Obi-Wan Kenobi and Yoda. He refused to kill his father and so helped redeem him. Years later his new Jedi temple fell when his nephew Ben Solo turned, and he went into exile on Ahch-To.",
  facts:["He destroyed the Death Star using the Force instead of his targeting computer.","He lost his right hand to Darth Vader on Cloud City.","He returned briefly to rescue Grogu in The Mandalorian season 2.","He died on Crait after projecting himself across the galaxy to face Kylo Ren in The Last Jedi."]},
 legends:{bio:"In Legends, Luke rebuilds the Jedi Order himself. He founds the Jedi Praxeum on Yavin 4 and leads the New Jedi Order for decades. He marries former Imperial agent Mara Jade.",
  facts:["His son with Mara Jade is Ben Skywalker.","In Dark Empire (1991) he briefly turns to the dark side to bring down a cloned Emperor from the inside.","He faces the mad Jedi clone Joruus C'baoth in Timothy Zahn's Thrawn trilogy."]}},
{n:"Leia Organa",aff:"Rebel / Resistance",era:"Original trilogy",species:"Human",home:"Alderaan",first:"A New Hope (1977)",saber:"Leia Organa",
 canon:{bio:"Luke's twin sister, adopted by Bail and Breha Organa and raised as a princess of Alderaan. She became the youngest senator in the Imperial Senate while secretly working for the Rebellion. After the war she served in the New Republic and later founded the Resistance to fight the First Order.",
  facts:["Obi-Wan rescued her as a 10-year-old in the Obi-Wan Kenobi series.","She trained as a Jedi with Luke but stepped away from the path.","She and Han Solo had one son, Ben, who became Kylo Ren.","She used the Force to survive being blown into space in The Last Jedi."]},
 legends:{bio:"In Legends, Leia marries Han and becomes Chief of State of the New Republic. She completes her Jedi training and becomes a Jedi Knight.",
  facts:["She has three children: twins Jaina and Jacen, and Anakin Solo.","Jacen falls to the dark side as Darth Caedus in the Legacy of the Force series.","She leads the New Republic through the Yuuzhan Vong invasion."]}},
{n:"Han Solo",aff:"Rebel / Resistance",era:"Original trilogy",species:"Human",home:"Corellia",first:"A New Hope (1977)",
 canon:{bio:"A Corellian street kid who joined the Imperial Navy to escape, then deserted and became a smuggler. He won the Millennium Falcon from Lando Calrissian, joined the Rebellion and became a general. He was killed by his son, Kylo Ren, on Starkiller Base.",
  facts:["He made the Kessel Run in just under 12 parsecs (Solo shows how).","He met Chewbacca when the Empire threw him into a pit on Mimban.","Jabba the Hutt had him frozen in carbonite after Cloud City.","He and Leia married after the Galactic Civil War."]},
 legends:{bio:"In Legends, Han lives a long life, marries Leia and raises three children. He keeps flying the Falcon well into old age.",
  facts:["Chewbacca dies saving Han's son Anakin in Vector Prime (1999).","Han's ship and kids are central to the New Jedi Order books.","The Han Solo Trilogy novels by A.C. Crispin tell his younger years."]}},
{n:"Chewbacca",aff:"Rebel / Resistance",era:"Original trilogy",species:"Wookiee",home:"Kashyyyk",first:"A New Hope (1977)",
 canon:{bio:"A Wookiee warrior and Han Solo's partner and co-pilot. He fought for the Republic in the Clone Wars, was enslaved by the Empire, and was freed when he and Han escaped from Mimban. He served the Rebellion and the Resistance and outlived his best friend.",
  facts:["He was over 200 years old by the time of The Force Awakens.","He fought alongside Yoda at the Battle of Kashyyyk in Revenge of the Sith.","Maz Kanata gave him a medal in The Rise of Skywalker after he never got one at Yavin.","His bowcaster is a traditional Wookiee weapon."]},
 legends:{bio:"In Legends, Chewbacca has a family on Kashyyyk and owes Han a life debt for saving him from slavers.",
  facts:["His wife is Mallatobuck and his son is Lumpawarrump (from the 1978 Holiday Special).","He dies when the moon Sernpidal falls in Vector Prime, saving young Anakin Solo.","His death was one of the most controversial moments in the Expanded Universe."]}},
{n:"Anakin Skywalker / Darth Vader",aff:"Jedi → Sith",era:"Prequels & original trilogy",species:"Human",home:"Tatooine",first:"A New Hope (1977) as Vader",saber:"Anakin Skywalker",
 canon:{bio:"Born a slave on Tatooine with no father, Anakin was believed to be the Chosen One of Jedi prophecy. Qui-Gon Jinn found him and Obi-Wan trained him. He secretly married Padmé Amidala. Visions of her death let Palpatine turn him, and as Darth Vader he hunted the Jedi for two decades. He was redeemed when he saved Luke and destroyed the Emperor.",
  facts:["He was the only human who could race podracers, and he won the Boonta Eve race.","Ahsoka Tano was his Padawan during the Clone Wars.","He lost his limbs and was badly burned in his duel with Obi-Wan on Mustafar.","He built C-3PO as a child."]},
 legends:{bio:"In Legends, Vader's years under the Emperor are filled out in games, comics and novels, including a secret apprentice the Emperor knew nothing about.",
  facts:["His secret apprentice Galen Marek, codenamed Starkiller, stars in The Force Unleashed (2008).","Shadows of the Empire pits him against crime lord Prince Xizor.","Leia's youngest son, Anakin Solo, is named after him."]}},
{n:"Obi-Wan Kenobi",aff:"Jedi",era:"Prequels & original trilogy",species:"Human",home:"Stewjon",first:"A New Hope (1977)",saber:"Obi-Wan Kenobi",
 canon:{bio:"Qui-Gon Jinn's Padawan, and later Anakin Skywalker's master and a Jedi general in the Clone Wars. After Order 66 he watched over Luke on Tatooine. He let Vader strike him down on the Death Star and guided Luke as a Force spirit.",
  facts:["He defeated Darth Maul twice: on Naboo, and again on Tatooine in Rebels.","He loved Duchess Satine of Mandalore, who was killed in front of him.","He rescued a young Leia in the Obi-Wan Kenobi series (2022).","General Grievous fell to him on Utapau."]},
 legends:{bio:"In Legends, Obi-Wan's apprenticeship and his exile are told in many novels and comics.",
  facts:["The Jedi Apprentice books cover his teen years training with Qui-Gon.","Kenobi (2013) by John Jackson Miller follows his first year on Tatooine.","He had a past romance with fellow Jedi Siri Tachi."]}},
{n:"Yoda",aff:"Jedi",era:"Prequels & original trilogy",species:"Unknown (same as Grogu)",home:"Unknown",first:"The Empire Strikes Back (1980)",saber:"Yoda",
 canon:{bio:"Grand Master of the Jedi Order, who trained Jedi for some 800 years. After failing to defeat Darth Sidious, he went into exile on Dagobah, where he later trained Luke. He died at 900 and became one with the Force.",
  facts:["His species has never been named on screen.","He fought Count Dooku on Geonosis and Darth Sidious in the Senate chamber.","As a Force spirit he called down lightning to burn the old Jedi tree in The Last Jedi.","He learned how to keep his identity after death from the spirit of Qui-Gon (The Clone Wars)."]},
 legends:{bio:"In Legends, Yoda appears in many prequel-era novels and comics as the Order's wise leader.",
  facts:["In Dark Rendezvous (2004) he meets his former student Count Dooku.","Another of his species, Yaddle, sat on the Jedi Council.","Legends gave him centuries of former students."]}},
{n:"Darth Sidious (Palpatine)",aff:"Sith",era:"All three trilogies",species:"Human",home:"Naboo",first:"The Empire Strikes Back (1980)",saber:"Darth Sidious",
 canon:{bio:"Sheev Palpatine was a senator from Naboo and secretly a Sith Lord, the apprentice of Darth Plagueis. He engineered the Clone Wars, became Supreme Chancellor, ordered the Jedi purge and declared himself Emperor. He was thrown down a reactor shaft at Endor but returned on Exegol, where Rey destroyed him.",
  facts:["His first name, Sheev, was revealed in the 2014 novel Tarkin.","Order 66 made the clone troopers turn on their Jedi generals.","His granddaughter is Rey.","His Sith apprentices included Maul, Dooku and Vader."]},
 legends:{bio:"In Legends, Palpatine also returns after Endor. Here he does it with clone bodies in Dark Empire, six years after Return of the Jedi.",
  facts:["Darth Plagueis (2012) by James Luceno tells how he killed his master.","He is finally defeated when his last clone body is ruined (Empire's End).","The Rule of Two that he follows was created by Darth Bane, star of his own Legends trilogy."]}},
{n:"Padmé Amidala",aff:"Republic",era:"Prequels",species:"Human",home:"Naboo",first:"The Phantom Menace (1999)",
 canon:{bio:"Padmé was elected Queen of Naboo at 14 and led her people through the Trade Federation's invasion. She then became Naboo's senator and a voice for peace during the Clone Wars. She secretly married Anakin and died after giving birth to Luke and Leia.",
  facts:["Her handmaidens, including Sabé, sometimes posed as her as decoys.","Queen's Shadow (2019) covers her move from queen to senator.","She helped found what became the Rebel Alliance.","She died on the asteroid Polis Massa."]},
 legends:null,legendsNote:"Her Legends story follows the films closely. Most of her deeper backstory was written after 2014 and is canon."},
{n:"Mace Windu",aff:"Jedi",era:"Prequels",species:"Human (Korun)",home:"Haruun Kal",first:"The Phantom Menace (1999)",saber:"Mace Windu",
 canon:{bio:"A senior member of the Jedi Council and one of the Order's best duelists. He created the dangerous Vaapad style. He tried to arrest Palpatine and nearly won before Anakin's betrayal.",
  facts:["He beheaded Jango Fett on Geonosis.","He sat on the Jedi Council beside Yoda.","Palpatine's lightning threw him from a window of the Chancellor's office."]},
 legends:{bio:"In Legends, Mace's past and his mastery of Vaapad are central to Matthew Stover's novel Shatterpoint.",
  facts:["Shatterpoint (2003) sends him back to his homeworld, Haruun Kal.","In the 2003 Clone Wars microseries he defeats a droid army bare-handed.","He can see \"shatterpoints\", the weak spots in people and events."]}},
{n:"Qui-Gon Jinn",aff:"Jedi",era:"Prequels",species:"Human",home:"Unknown",first:"The Phantom Menace (1999)",saber:"Qui-Gon Jinn",
 canon:{bio:"A Jedi Master who often defied the Council and followed the Living Force. He discovered Anakin on Tatooine and insisted he be trained. Darth Maul killed him on Naboo.",
  facts:["He was Count Dooku's Padawan, and Obi-Wan was his.","He was the first Jedi to learn to keep his identity after death.","His voice reaches Rey in The Rise of Skywalker."]},
 legends:{bio:"In Legends, his years training Obi-Wan are told in the Jedi Apprentice book series.",
  facts:["His first apprentice, Xanatos, fell to the dark side.","The Jedi Apprentice series by Jude Watson ran 20 books.","The 2001 novel Cloak of Deception shows his work just before The Phantom Menace."]}},
{n:"Darth Maul",aff:"Sith",era:"Prequels to Rebels",species:"Dathomirian Zabrak",home:"Dathomir",first:"The Phantom Menace (1999)",saber:"Darth Maul",
 canon:{bio:"Palpatine's first known apprentice, raised as a weapon. Obi-Wan cut him in half on Naboo, but his hatred kept him alive, and he returned with robotic legs. He built a criminal empire, ran Crimson Dawn, and died facing Obi-Wan on Tatooine.",
  facts:["His brother Savage Opress fought at his side in The Clone Wars.","He led the Shadow Collective crime syndicate and briefly ruled Mandalore.","He appears as Crimson Dawn's leader in Solo (2018).","He blinded Kanan Jarrus on Malachor."]},
 legends:{bio:"In Legends, Maul dies on Naboo, and his stories take place before The Phantom Menace.",
  facts:["Shadow Hunter (2001) has him hunting a Neimoidian who knows Sidious's plans.","His survival in The Clone Wars was adopted into the main continuity.","His Legends training under Sidious was brutal and solitary."]}},
{n:"Count Dooku",aff:"Sith",era:"Prequels",species:"Human",home:"Serenno",first:"Attack of the Clones (2002)",saber:"Count Dooku",
 canon:{bio:"A Jedi Master and Qui-Gon's teacher who left the Order disillusioned with the Republic. He reclaimed his title as Count of Serenno, became Darth Tyranus and led the Separatists. Anakin killed him aboard the Invisible Hand.",
  facts:["Dooku: Jedi Lost (2019) tells his life story.","He secretly ordered the clone army through the Jedi Sifo-Dyas.","He trained Asajj Ventress as his assassin.","He was played by Christopher Lee."]},
 legends:{bio:"In Legends, Dooku also had dark side apprentices and agents before Ventress.",
  facts:["The Bounty Hunter game (2002) features his former student Komari Vosa.","He uses Force lightning in many Clone Wars-era Legends comics.","Labyrinth of Evil (2005) covers his final days."]}},
{n:"General Grievous",aff:"Separatist",era:"Prequels",species:"Kaleesh (cyborg)",home:"Kalee",first:"Clone Wars microseries (2004)",saber:"General Grievous",
 canon:{bio:"A Kaleesh warlord rebuilt as a cyborg and made Supreme Commander of the Separatist droid armies. He hunted Jedi and kept their lightsabers as trophies. Obi-Wan killed him on Utapau.",
  facts:["He trained in lightsaber combat under Count Dooku.","His arms can split to wield four sabers at once.","He kidnapped Chancellor Palpatine at the start of Revenge of the Sith."]},
 legends:{bio:"In Legends, Grievous debuts in Genndy Tartakovsky's Clone Wars microseries, and his cough has a cause.",
  facts:["His Legends birth name is Qymaen jai Sheelal.","Mace Windu crushes his chest with the Force at the end of the 2003 microseries, which explains his cough.","Legends says his cyborg rebuild was secretly arranged after a staged shuttle crash."]}},
{n:"Ahsoka Tano",aff:"Jedi (independent)",era:"Clone Wars to New Republic",species:"Togruta",home:"Shili",first:"The Clone Wars (2008)",saber:"Ahsoka Tano",
 canon:{bio:"Anakin's Padawan during the Clone Wars. She left the Order after she was framed for a bombing and the Council failed to trust her. She survived Order 66, became the Rebellion's informant Fulcrum, and later searched for Grand Admiral Thrawn and Ezra Bridger.",
  facts:["Yoda assigned her to Anakin.","She fought Darth Vader on Malachor in Rebels.","Rosario Dawson plays her in live action, and Ashley Eckstein voices her in animation.","Her white sabers come from crystals she purified (the novel Ahsoka)."]},
 legends:null,legendsNote:"Ahsoka was created for The Clone Wars, which stayed in canon after 2014, so she has no separate Legends version."},
{n:"Asajj Ventress",aff:"Dark side → bounty hunter",era:"Clone Wars",species:"Dathomirian",home:"Dathomir",first:"Star Wars: Republic comics (2003)",saber:"Asajj Ventress",
 canon:{bio:"A Nightsister of Dathomir, sold into slavery as a child and trained by a Jedi, Ky Narec, who was later killed. Dooku made her his assassin, then betrayed her on Sidious's orders. She turned bounty hunter and died saving her love, Quinlan Vos.",
  facts:["Dark Disciple (2015) tells her final story.","She reluctantly helped Ahsoka clear her name.","She led Savage Opress to Dooku as part of a revenge plot."]},
 legends:{bio:"Ventress began in Legends, in the Republic comics and the 2003 Clone Wars microseries, as Dooku's assassin.",
  facts:["She duels Anakin on Yavin 4 in the microseries.","In the comic Obsession she seemingly dies at Boz Pity.","Her Legends story leaves her fate open."]}},
{n:"Boba Fett",aff:"Bounty hunter",era:"Prequels to New Republic",species:"Human (clone)",home:"Kamino",first:"Holiday Special (1978)",
 canon:{bio:"An unaltered clone of the bounty hunter Jango Fett, raised as his son. He watched Mace Windu kill Jango on Geonosis and became a bounty hunter himself. He survived the Sarlacc, lived with the Tusken Raiders, and took over Jabba's territory as daimyo of Mos Espa.",
  facts:["He delivered a frozen Han Solo to Jabba the Hutt.","He returned in The Mandalorian season 2.","The Book of Boba Fett (2021) covers his rule on Tatooine.","He was first seen in an animated segment of the 1978 Holiday Special."]},
 legends:{bio:"In Legends, Boba also escapes the Sarlacc. He goes on to lead the Mandalorians.",
  facts:["He becomes Mandalore in the Legacy of the Force series.","He had a wife, Sintas Vel, and a daughter, Ailyn.","Tales of the Bounty Hunters (1996) shows his escape from the Sarlacc."]}},
{n:"Din Djarin (The Mandalorian)",aff:"Mandalorian",era:"New Republic",species:"Human",home:"Aq Vetina",first:"The Mandalorian (2019)",saber:"Din Djarin (Darksaber)",
 canon:{bio:"A foundling rescued by Mandalorians during the Clone Wars and raised in a strict covert, the Children of the Watch. Hired to capture Grogu, he chose to protect him instead. He won the Darksaber, then helped Bo-Katan Kryze retake Mandalore.",
  facts:["He follows the Way: he never removes his helmet in front of other people.","He adopted Grogu as his son and apprentice.","Pedro Pascal plays him.","The Mandalorian and Grogu (2026) took him to the big screen."]},
 legends:null,legendsNote:NOLEG},
{n:"Grogu",aff:"Foundling",era:"New Republic",species:"Unknown (same as Yoda)",home:"Coruscant (Jedi Temple)",first:"The Mandalorian (2019)",
 canon:{bio:"A Force-sensitive youngling who was saved from the Jedi Temple during Order 66. Bounty hunters were sent after him years later, and Din Djarin became his protector. He trained briefly with Luke Skywalker but chose the Mandalorian way.",
  facts:["He was about 50 years old when Din found him.","Jedi Master Kelleran Beq carried him out of the Temple during Order 66.","Fans nicknamed him \"Baby Yoda\" before his name was revealed."]},
 legends:null,legendsNote:NOLEG},
{n:"Rey",aff:"Jedi",era:"Sequel trilogy",species:"Human",home:"Jakku",first:"The Force Awakens (2015)",saber:"Rey",
 canon:{bio:"A scavenger abandoned on Jakku as a child, waiting for parents who never returned. She found the Skywalker saber, trained with Luke and Leia, and learned she was Palpatine's granddaughter. She defeated him on Exegol and took the name Rey Skywalker.",
  facts:["Her parents hid her on Jakku to keep her safe from Palpatine.","She and Kylo Ren formed a Force dyad.","She built her own yellow-bladed saber."]},
 legends:null,legendsNote:NOLEG},
{n:"Kylo Ren (Ben Solo)",aff:"Dark side",era:"Sequel trilogy",species:"Human",home:"Chandrila",first:"The Force Awakens (2015)",saber:"Kylo Ren",
 canon:{bio:"Ben Solo was the son of Han and Leia and Luke's student. Snoke manipulated him toward the dark side, and he left as Kylo Ren, leader of the Knights of Ren. He killed his father, overthrew Snoke and became Supreme Leader. He returned to the light and gave his life to save Rey.",
  facts:["He was obsessed with his grandfather, Darth Vader.","His fall began after Luke briefly considered killing him in his sleep.","Adam Driver plays him."]},
 legends:null,legendsNote:NOLEG+" His closest Legends counterpart is Jacen Solo, Han and Leia's son who became Darth Caedus."},
{n:"Grand Admiral Thrawn",aff:"Empire",era:"Rebels to New Republic",species:"Chiss",home:"Csilla",first:"Heir to the Empire (1991)",
 canon:{bio:"Mitth'raw'nuruodo is a Chiss military genius who joined the Empire and rose to Grand Admiral. He studies the art of a culture to understand and defeat it. At the end of Rebels, Ezra Bridger dragged him into hyperspace with the purrgil, and he returned in Ahsoka (2023).",
  facts:["Timothy Zahn's novels Thrawn (2017) and its sequels tell his canon backstory.","He hunted the Ghost crew in Rebels.","Lars Mikkelsen plays him in live action."]},
 legends:{bio:"Thrawn began in Legends: Timothy Zahn created him for the Thrawn trilogy, the books that relaunched Star Wars fiction in 1991.",
  facts:["He nearly destroys the New Republic in Heir to the Empire, Dark Force Rising and The Last Command.","His Noghri bodyguard Rukh kills him at the Battle of Bilbringi.","He was so popular that Lucasfilm brought him into canon in 2016."]}},
{n:"Kanan Jarrus",aff:"Jedi / Rebel",era:"Rebels",species:"Human",home:"Coruscant",first:"Rebels (2014)",saber:"Kanan Jarrus",
 canon:{bio:"Born Caleb Dume, he was Depa Billaba's Padawan and survived Order 66 as a teenager. He hid for years as a drifter, then joined Hera Syndulla on the Ghost and trained Ezra Bridger. He died shielding his friends on Lothal.",
  facts:["Maul blinded him on Malachor.","He and Hera had a son, Jacen Syndulla.","His Order 66 escape is shown in Star Wars: Kanan comics and The Bad Batch."]},
 legends:null,legendsNote:NOLEG},
{n:"Ezra Bridger",aff:"Jedi / Rebel",era:"Rebels",species:"Human",home:"Lothal",first:"Rebels (2014)",saber:"Ezra Bridger",
 canon:{bio:"A street kid on Lothal whose parents were taken by the Empire. He joined the Ghost crew and trained with Kanan. He freed Lothal by riding the purrgil into hyperspace with Thrawn, and he was found again in Ahsoka (2023).",
  facts:["He was born on Empire Day.","He can talk with animals through the Force.","Eman Esfandi plays him in live action."]},
 legends:null,legendsNote:NOLEG},
{n:"Cal Kestis",aff:"Jedi",era:"Early Empire",species:"Human",home:"Coruscant",first:"Jedi: Fallen Order (2019)",saber:"Cal Kestis",
 canon:{bio:"Jaro Tapal's Padawan, who escaped Order 66 when his master died protecting him. He hid as a shipbreaker on Bracca until a Force slip exposed him. He joined Cere Junda and the Mantis crew to rebuild the Jedi, and his journey continues in Jedi: Survivor.",
  facts:["His droid partner is BD-1.","Cameron Monaghan plays him.","He destroyed a Jedi holocron to protect the children listed in it."]},
 legends:null,legendsNote:NOLEG},
{n:"Baylan Skoll",aff:"Former Jedi",era:"New Republic",species:"Human",home:"Unknown",first:"Ahsoka (2023)",saber:"Baylan Skoll",
 canon:{bio:"A Jedi who survived Order 66 and became a mercenary, disillusioned with both the Jedi and the Republic. He and his apprentice, Shin Hati, were hired to help bring back Thrawn. He went to Peridea searching for a source of great power.",
  facts:["Ray Stevenson played him and died shortly before the show premiered.","He was a Jedi Knight when the Order fell."]},
 legends:null,legendsNote:NOLEG},
{n:"Lando Calrissian",aff:"Rebel / Resistance",era:"Original trilogy",species:"Human",home:"Socorro",first:"The Empire Strikes Back (1980)",
 canon:{bio:"A gambler and smooth operator who lost the Millennium Falcon to Han Solo in a sabacc game. As Baron Administrator of Cloud City he was forced to betray his friend, then made amends. He flew the Falcon to destroy the second Death Star and later helped lead the fleet to Exegol.",
  facts:["Donald Glover played young Lando in Solo, and Billy Dee Williams played him in the films.","His droid co-pilot was L3-37.","He became a general for the Rebellion."]},
 legends:{bio:"In Legends, Lando keeps hunting for fortunes, wins and loses businesses, and eventually settles down.",
  facts:["He runs the Nomad City mining operation on Nkllon in the Thrawn trilogy.","He marries Tendra Risant.","L. Neil Smith's Lando Calrissian Adventures (1983) told his early days."]}},
{n:"C-3PO & R2-D2",aff:"Droids",era:"All three trilogies",species:"Protocol and astromech droids",home:"Tatooine / Naboo",first:"A New Hope (1977)",
 canon:{bio:"C-3PO is a protocol droid that young Anakin built on Tatooine, and R2-D2 is a Naboo astromech. They were in nearly every major event of the saga. 3PO's memory was wiped after Revenge of the Sith, but R2 never was.",
  facts:["C-3PO is fluent in over six million forms of communication.","R2 carried Leia's message to Obi-Wan and the Death Star plans.","Anthony Daniels played C-3PO in every live-action saga film."]},
 legends:{bio:"In Legends, the pair had adventures between the trilogies, including their own cartoon.",
  facts:["The animated series Droids (1985) followed them under other owners.","3PO is also built by Anakin in Legends.","R2 keeps Luke's lightsaber in his dome in Return of the Jedi."]}}
];
const AFFC={"Jedi":"#4f8cff","Sith":"#ff3b3b","Jedi → Sith":"#b04dff","Rebel / Resistance":"#ff8a1f","Empire":"#9aa3b5","Separatist":"#c9a227","Bounty hunter":"#3ddc84","Mandalorian":"#7dd3c7","Foundling":"#7bd88f","Republic":"#e9c46a","Droids":"#ffe81f"};
const col=a=>AFFC[a]||(a.includes("Jedi")?"#4f8cff":a.includes("Dark")||a.includes("Sith")?"#ff3b3b":"#9aa3b5");
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ini=n=>n.replace(/\(.*?\)/g,"").split(/[\s/&]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
let cur=0,mode="canon";
function css(){if(document.getElementById("chCss"))return;const s=document.createElement("style");s.id="chCss";s.textContent=`
.ch-wrap{display:grid;grid-template-columns:300px 1fr;gap:16px;align-items:start}
.ch-list{display:flex;flex-direction:column;gap:6px;max-height:72vh;overflow:auto;padding-right:4px}
.ch-it{display:flex;gap:10px;align-items:center;padding:8px 10px;border-radius:10px;background:var(--panel2);border:1px solid var(--line);cursor:pointer;text-align:left}
.ch-it:hover{border-color:#3a4256}.ch-it.on{border-color:var(--sw);box-shadow:0 0 0 1px var(--sw) inset}
.ch-av{width:38px;height:38px;border-radius:50%;flex:none;display:grid;place-items:center;font-family:Oswald,Impact,sans-serif;font-size:15px;color:#0b0d12;font-weight:700}
.ch-it .t{font-weight:700;font-size:14px;line-height:1.2}.ch-it .s{font-size:12px;color:var(--muted)}
.ch-d{background:var(--panel2);border:1px solid var(--line);border-radius:14px;padding:18px}
.ch-hd{display:flex;gap:14px;align-items:center;margin-bottom:12px}.ch-hd .ch-av{width:64px;height:64px;font-size:24px}
.ch-tabs{display:flex;gap:6px;margin:12px 0}.ch-tabs button{padding:6px 14px;border-radius:999px;border:1px solid var(--line);background:var(--panel);cursor:pointer;font-weight:700;font-size:13px}
.ch-tabs button.on{background:var(--sw);color:#111;border-color:var(--sw)}
.ch-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:10px 0}
.ch-grid div{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:8px 10px}.ch-grid b{display:block;font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
.ch-d p{color:var(--text);line-height:1.6;margin:8px 0}.ch-d ul{margin:6px 0 0;padding-left:18px;color:var(--muted)}.ch-d li{margin:5px 0}
.ch-leg{border-left:3px solid #c9a227;padding-left:12px}
@media(max-width:820px){.ch-wrap{grid-template-columns:1fr}.ch-list{max-height:none;flex-direction:row;overflow-x:auto}.ch-it{min-width:200px}}`;document.head.appendChild(s);}
function list(){const q=(document.getElementById("chSearch").value||"").toLowerCase(),f=document.getElementById("chAff").value;
 const rows=C.map((c,i)=>[c,i]).filter(([c])=>(!q||c.n.toLowerCase().includes(q))&&(!f||c.aff===f));
 document.getElementById("chList").innerHTML=rows.map(([c,i])=>`<button class="ch-it${i===cur?" on":""}" data-i="${i}"><span class="ch-av" style="background:${col(c.aff)}">${ini(c.n)}</span><span><span class="t">${esc(c.n)}</span><br><span class="s">${esc(c.aff)} · ${esc(c.era)}</span></span></button>`).join("")||`<div class="small dim">No characters match.</div>`;}
function detail(){const c=C[cur],L=c.legends,showLeg=mode==="legends";
 const body=showLeg?(L?`<div class="ch-leg"><p>${esc(L.bio)}</p><ul>${L.facts.map(f=>`<li>${esc(f)}</li>`).join("")}</ul></div>`:`<div class="ch-leg"><p class="muted">${esc(c.legendsNote||NOLEG)}</p></div>`)
  :`<p>${esc(c.canon.bio)}</p><div class="small dim" style="margin-top:12px">KEY FACTS</div><ul>${c.canon.facts.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>`;
 document.getElementById("chDetail").innerHTML=`<div class="ch-hd"><span class="ch-av" style="background:${col(c.aff)}">${ini(c.n)}</span><div><h3 style="font-size:24px">${esc(c.n)}</h3><div class="small muted">${esc(c.aff)}</div></div></div>
 <div class="ch-grid"><div><b>Species</b>${esc(c.species)}</div><div><b>Homeworld</b>${esc(c.home)}</div><div><b>Era</b>${esc(c.era)}</div><div><b>First appearance</b>${esc(c.first)}</div></div>
 <div class="ch-tabs"><button data-m="canon" class="${showLeg?"":"on"}">Canon</button><button data-m="legends" class="${showLeg?"on":""}">Legends${L?"":" (none)"}</button></div>
 ${body}
 ${c.saber?`<button class="btn sm pri" id="chSaber" style="margin-top:14px">View their saber in 3D</button>`:""}
 <div class="small dim" style="margin-top:14px">${showLeg?"Legends is the Expanded Universe written before April 2014. Lucasfilm no longer counts it as official history, but new stories often borrow from it.":"Canon is the official Star Wars story: the films, the series, and books and games published since April 2014."}</div>`;}
function render(){list();detail();}
function init(){const root=document.getElementById("swChars");if(!root)return;css();
 const affs=[...new Set(C.map(c=>c.aff))];
 root.innerHTML=`<div class="row" style="margin-bottom:12px;gap:8px;flex-wrap:wrap"><input type="text" id="chSearch" placeholder="Search character" style="width:200px"><label class="small muted">Affiliation <select id="chAff"><option value="">All</option>${affs.map(a=>`<option>${esc(a)}</option>`).join("")}</select></label><span class="sp"></span><span class="small dim">${C.length} characters</span></div>
 <div class="ch-wrap"><div class="ch-list" id="chList"></div><div class="ch-d" id="chDetail"></div></div>`;
 document.getElementById("chSearch").oninput=list;document.getElementById("chAff").onchange=list;
 document.getElementById("chList").onclick=e=>{const b=e.target.closest("[data-i]");if(!b)return;cur=+b.dataset.i;render();};
 document.getElementById("chDetail").onclick=e=>{const m=e.target.closest("[data-m]");if(m){mode=m.dataset.m;detail();return;}
  if(e.target.id==="chSaber"){const D=window.SWDATA,a=D&&D.ARCHIVE.find(x=>x.n===C[cur].saber);if(a&&window.SV){location.hash="starwars-archive";setTimeout(()=>SV.open(a),50);}}};
 render();}
window.SWCHARS={init,data:C};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
