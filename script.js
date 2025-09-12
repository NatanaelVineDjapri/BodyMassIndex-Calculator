const male = document.getElementById('male');
const female = document.getElementById('female');
const heightSlider = document.getElementById('height');
const heightValue = document.getElementById('height-value');
const weightValue = document.getElementById('weight-value');
const weightText = document.getElementById('weight');
const ageText = document.getElementById('age');
const minusBtnW = document.getElementById('minusW');
const plusBtnW = document.getElementById('plusW');
const minusBtnA = document.getElementById('minusA');
const plusBtnA = document.getElementById('plusA');
const cmRadio = document.getElementById('cm');
const mRadio = document.getElementById('m');
const ftRadio = document.getElementById('ftin');
const kgRadio = document.getElementById('kg');
const lbsRadio = document.getElementById('lbs');
const satuan= document.getElementById('satuan');
const trackman = document.getElementById('trackman');
const trackkidman = document.getElementById('trackkidman');
const trackwoman = document.getElementById('trackwoman');
const trackkidwoman = document.getElementById('trackkidwoman');
const calculate = document.getElementById('calculate');
const bmiresult = document.getElementById('bmiresult');
const kategori = document.getElementById('kategori');
const bmiimg = document.getElementById('bmiimg');


let gender = null;
let weight = 50;
let age = 19;
let height = parseInt(heightSlider.value);

function calculateBMI(){
    const bmi = (weight/(height*height)).toFixed(2)
    return bmi;
}

function cmToFeetInch(cm){
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
}

function kgToLbs(weight){
    const totalLbs = (weight * 2.20462).toFixed(1)
    return totalLbs;
}

function updateWeight(){
    if(kgRadio.checked){
        weightValue.textContent = `${weight} `
        satuan.textContent = `kg`
         weightValue.style.fontSize = "1.5rem";
         satuan.style.fontSize ="1rem"
    } else if(lbsRadio.checked){
        const newWeight = kgToLbs(weight);
        weightValue.textContent = `${newWeight} `
        satuan.textContent = `lbs`
        weightValue.style.fontSize ="1rem"
        satuan.style.fontSize ="0.5rem"
    }
}
function updateHeight() {
    const heightCm = parseInt(heightSlider.value);
    height = heightCm / 100; 

    if (cmRadio.checked) {
        heightValue.textContent = `${heightCm} cm`;
    } else if (mRadio.checked) {
        heightValue.textContent = `${height.toFixed(2)} m`;
    } else if(ftRadio.checked){
        const { feet, inches } = cmToFeetInch(heightCm);
        heightValue.textContent = `${feet}′ ${inches}″`;
    }
}

function categoryAdult(gender, bmi) {
    let cat = '';
    if (gender === 'male') {
        if (bmi < 20) {
            cat = 'Underweight';
        } else if (bmi < 25) {
            cat = 'Normal';
        } else if (bmi < 30) {
            cat = 'Overweight';
        } else {
            cat = 'Obese';
        }
    } else if (gender === 'female') {
        if (bmi < 19) {
            cat = 'Underweight';
        } else if (bmi < 24) {
            cat = 'Normal';
        } else if (bmi < 29) {
            cat = 'Overweight';
        } else {
            cat = 'Obese';
        }
    }
    return cat;
}

function categoryChild(gender, bmi,age) {
    let min = 0;
    let max = 0;

    if (gender === 'male') {
        if (age <= 5) {
            min = 13; max = 17;
        } else if (age >= 6 && age <= 8) {
            min = 13; max = 18;
        } else if (age >= 9 && age <= 12) {
            min = 14; max = 20;
        } else if (age >= 13 && age <= 17) {
            min = 16; max = 22;
        }
    } else if (gender === 'female') {
        if (age <= 5) {
            min = 13; max = 17;
        } else if (age >= 6 && age <= 8) {
            min = 13; max = 18;
        } else if (age >= 9 && age <= 12) {
            min = 14; max = 20;
        } else if (age >= 13 && age <= 17) {
            min = 16; max = 22;
        }
    }

    if (bmi < min) {
        return 'Underweight';
    } else if (bmi <= max) {
        return 'Normal';
    } else {
        return 'Overweight/Obese';
    }
}

function showCategory() {
    document.querySelector('.track-bmi').style.display = "flex";

    trackman.style.display = "none";
    trackwoman.style.display = "none";
    trackkidman.style.display = "none";
    trackkidwoman.style.display = "none";

    if (age < 18) {
        if (gender === 'male') {
            trackkidman.style.display = 'block';
        } else if (gender === 'female') {
            trackkidwoman.style.display = 'block';
        }
    } else {
        if (gender === 'male') {
            trackman.style.display = 'block';
        } else if (gender === 'female') {
            trackwoman.style.display = 'block';
        }
    }

    bmiimg.style.display = "none";
}

male.addEventListener('click',function(){
    male.classList.add('selected');
    female.classList.remove('selected');
    gender = 'male'
});

female.addEventListener('click',function(){
    female.classList.add('selected');
    male.classList.remove('selected');
    gender = 'female'
});

minusBtnW.addEventListener('click',function(){
    if(weight>0){
        weight--;
    }
    updateWeight();
})

plusBtnW.addEventListener('click',function(){
    weight++;
    updateWeight();
})

minusBtnA.addEventListener('click',function(){
    if(age>0){
        age--;
    }
    ageText.textContent = age;
})

plusBtnA.addEventListener('click',function(){
    age++;
    ageText.textContent = age;
})


heightSlider.addEventListener('input',function(){
    updateHeight();
});

cmRadio.addEventListener('change', function(){
    updateHeight();
});

mRadio.addEventListener('change', function(){
    updateHeight();
});

ftRadio.addEventListener('change', function(){
    updateHeight();
});

kgRadio.addEventListener('change', function(){
    updateWeight();
});

lbsRadio.addEventListener('change', function(){
    updateWeight();
});

calculate.addEventListener('click',function(){
    if(!gender){
        alert('Masukan Data')
        return
    }

    showCategory()
    const bmi = calculateBMI();
     console.log('Age:', age, 'Gender:', gender, 'BMI:', bmi);
    let x = '';

    if (age < 18) {
        x = categoryChild(gender, bmi,age);
    } else {
        x = categoryAdult(gender, bmi);
    }
    bmiresult.textContent = bmi;
    kategori.textContent = x;
})

