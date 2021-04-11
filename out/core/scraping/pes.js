"use strict";
function getPESDescription(pesNumber) {
    switch (pesNumber) {
        case 1: {
            return 'Stupeň 1: zelený';
        }
        case 2: {
            return 'Stupeň 2: žlutý';
        }
        case 3: {
            return 'Stupeň 3: oranžový';
        }
        case 4: {
            return 'Stupeň 4: červený';
        }
        case 5: {
            return 'Stupeň 5: fialový';
        }
        default: {
            return 'error';
        }
    }
}
function getPESLongDescription(pesNumber) {
    switch (pesNumber) {
        case 1: {
            return 'Stav opatrnosti: epidemie je pod kontrolou, počet nakažených v celé populaci je nízký, epidemie výrazně neroste, testování a trasování kontaktů je efektivní, nízké riziko komunitního šíření nákazy.';
        }
        case 2: {
            return 'Stav pozornosti: objevují se lokální ohniska onemocnění, která vyžadují bezprostřední protiepidemickou intervenci s ochranou ohrožených skupin, vysoký důraz na maximální efektivitu testování a trasování kontaktů.';
        }
        case 3: {
            return 'Naléhavý stav: šíření epidemie sílí, tlak na systém zdravotní péče je zvýšený, situace vyžaduje intenzivní sledování počtu nakažených a hospitalizovaných, vysoký důraz na maximální efektivitu testování a trasování kontaktů, vysoké riziko komunitního šíření nákazy.';
        }
        case 4: {
            return 'Vážný stav: počet nakažených v populaci je vysoký, je významné bezprostřední riziko dalšího zhoršování situace, trasování kontaktů je omezeno, probíhá komunitní šíření nákazy.';
        }
        case 5: {
            return 'Kritický stav: celková kapacita systému nemocniční lůžkové a intenzivní péče se začíná blížit svému limitu, počet nakažených v populaci je vysoký, a to včetně zásahu zranitelných skupin obyvatel, trasování kontaktů je významně omezeno, probíhá komunitní šíření nákazy.';
        }
        default: {
            return 'error';
        }
    }
}
function getPESEmotion(pesNumber) {
    switch (pesNumber) {
        case 1: {
            return 'https://ourghtfu.sirv.com/Images/pesDogs/pes-1.png';
        }
        case 2: {
            return 'https://ourghtfu.sirv.com/Images/pesDogs/pes-2.png';
        }
        case 3: {
            return 'https://ourghtfu.sirv.com/Images/pesDogs/pes-3.png';
        }
        case 4: {
            return 'https://ourghtfu.sirv.com/Images/pesDogs/pes-4.png';
        }
        case 5: {
            return 'https://ourghtfu.sirv.com/Images/pesDogs/pes-5.png';
        }
        default: {
            return 'https://ourghtfu.sirv.com/Images/pesDogs/errorstop.png';
        }
    }
}
async function getPESData(pesNumber) {
    const numberToInt = +pesNumber;
    return { pesNumber: numberToInt, description: getPESDescription(numberToInt), meaning: getPESLongDescription(numberToInt), PESEmotion: getPESEmotion(numberToInt) };
}
module.exports = { getPESData };
