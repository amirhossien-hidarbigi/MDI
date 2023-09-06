document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("submit");
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  const ageInput = document.getElementById("age");
  const maleButton = document.querySelector(".male");
  const femaleButton = document.querySelector(".female");
  const resultDiv = document.getElementById("inputinfo");
  const overweightDiv = document.getElementById("overr");

  // تابع برای نمایش متن به تدریج با تایم
  function displayTextSlowly(text, delay, targetDiv) {
    let currentIndex = 0;

    function displayNextCharacter() {
      if (currentIndex < text.length) {
        targetDiv.textContent += text[currentIndex];
        currentIndex++;
        setTimeout(displayNextCharacter, delay);
      }
    }

    displayNextCharacter();
  }

  // برای کادرهای ورودی weightInput و heightInput و ageInput:
  // اضافه کردن یک گوش دهنده وقتی متن ورودی تغییر کند
  weightInput.addEventListener("input", function () {
    if (!/^\d*\.?\d*$/.test(weightInput.value)) {
      resultDiv.textContent = "Please enter a valid number for weight.";
      weightInput.value = weightInput.value.replace(/[^\d.]/g, "");
    } else {
      resultDiv.textContent = "";
    }
  });

  heightInput.addEventListener("input", function () {
    if (!/^\d*\.?\d*$/.test(heightInput.value)) {
      resultDiv.textContent = "Please enter a valid number for height.";
      heightInput.value = heightInput.value.replace(/[^\d.]/g, "");
    } else {
      resultDiv.textContent = "";
    }
  });

  ageInput.addEventListener("input", function () {
    if (!/^\d+$/.test(ageInput.value)) {
      resultDiv.textContent = "Please enter a valid number for age.";
      ageInput.value = ageInput.value.replace(/[^\d]/g, "");
    } else {
      resultDiv.textContent = "";
    }
  });

  calculateButton.addEventListener("click", function () {
    const weightKg = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);
    const age = parseInt(ageInput.value);
    const isMale = maleButton.classList.contains("clicked");
    const isFemale = femaleButton.classList.contains("clicked");

    if (isMale || isFemale) {
      if (
        !isNaN(weightKg) &&
        !isNaN(heightCm) &&
        !isNaN(age) &&
        heightCm > 0 &&
        age > 0
      ) {
        const heightM = heightCm / 100;

        let bmi;

        if (isMale) {
          bmi = weightKg / heightM ** 2;
        } else if (isFemale) {
          bmi = (weightKg * 1.1) / heightM ** 2;
        }

        // حذف متن اصلی
        resultDiv.textContent = "";
        overweightDiv.textContent = ""; // پاک کردن متن چاقی

        // نمایش مقدار BMI در resultDiv
        displayTextSlowly(`BMI: ${bmi.toFixed(2)}`, 100, resultDiv);

        // تعیین نوع وزن بر اساس BMI
        if (bmi >= 25) {
          displayTextSlowly("چاق", 100, overweightDiv);
        } else if (bmi < 18.5) {
          displayTextSlowly("لاغر", 100, overweightDiv);
        } else {
          displayTextSlowly("مساعد", 100, overweightDiv);
        }
      } else {
        // نمایش پیام خطا به تدریج با تایم
        resultDiv.textContent = "";
        overweightDiv.textContent = ""; // پاک کردن متن چاقی
        displayTextSlowly(
          "Please enter valid values for weight, height, and age.",
          100,
          resultDiv
        );
      }
    } else {
      // نمایش پیام خطا به تدریج با تایم
      resultDiv.textContent = "";
      overweightDiv.textContent = ""; // پاک کردن متن چاقی
      displayTextSlowly(
        "Please select your gender (Male/Female).",
        100,
        resultDiv
      );
    }
  });

  maleButton.addEventListener("click", function () {
    maleButton.classList.add("clicked");
    femaleButton.classList.remove("clicked");
  });

  femaleButton.addEventListener("click", function () {
    femaleButton.classList.add("clicked");
    maleButton.classList.remove("clicked");
  });
});
