// ĐIỂM TUYỂN SINH
document.getElementById("admissionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy giá trị từ các trường nhập liệu
    var passingScore = parseFloat(document.getElementById("passingScore").value);
    var subject1 = parseFloat(document.getElementById("subject1").value);
    var subject2 = parseFloat(document.getElementById("subject2").value);
    var subject3 = parseFloat(document.getElementById("subject3").value);
    var region = document.getElementById("region").value.toUpperCase();
    var target = parseFloat(document.getElementById("target").value);

    // Tính điểm ưu tiên theo khu vực
    var regionBonus = 0;
    if (region === "A") {
        regionBonus = 2;
    } else if (region === "B") {
        regionBonus = 1;
    } else if (region === "C") {
        regionBonus = 0.5;
    }

    // Tính điểm ưu tiên theo đối tượng
    var targetBonus = 0;
    if (target === 1) {
        targetBonus = 2.5;
    } else if (target === 2) {
        targetBonus = 1.5;
    } else if (target === 3) {
        targetBonus = 1;
    }

    // Tính tổng điểm
    var totalScore = subject1 + subject2 + subject3 + regionBonus + targetBonus;

    // Kiểm tra điều kiện trúng tuyển
    if (totalScore >= passingScore && subject1 > 0 && subject2 > 0 && subject3 > 0) {
        document.getElementById("resultTuyenSinh").innerHTML = "Chúc mừng! Bạn đã trúng tuyển với tổng điểm " + totalScore.toFixed(1);
    } else {
        document.getElementById("resultTuyenSinh").innerHTML = "Rất tiếc, bạn không trúng tuyển";
    }
});

// TÍNH TIỀN ĐIỆN
document.getElementById("electricityForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var consumption = parseInt(document.getElementById("consumption").value);

    var totalPrice = calculateElectricityBill(consumption);

    var result = document.getElementById("result");
    result.innerHTML = "<i class='bx bxs-hand-right'></i><p>Tên khách hàng: " + name + "</p><p>Tổng tiền phải trả: " + totalPrice.toLocaleString() + "đ</p>";
});

function calculateElectricityBill(consumption) {
    var totalPrice = 0;

    if (consumption <= 50) {
        totalPrice = consumption * 500;
    } else if (consumption <= 100) {
        totalPrice = 50 * 500 + (consumption - 50) * 650;
    } else if (consumption <= 200) {
        totalPrice = 50 * 500 + 50 * 650 + (consumption - 100) * 850;
    } else if (consumption <= 350) {
        totalPrice = 50 * 500 + 50 * 650 + 100 * 850 + (consumption - 200) * 1100;
    } else {
        totalPrice = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (consumption - 350) * 1300;
    }

    return totalPrice;
}
// ----------------------------------------

// TÍNH THUẾ THU NHẬP CÁ NHÂN 
// $('input.CurrencyInput').on('blur', function () {
//     const value = this.value.replace(/,/g, '');
//     this.value = parseFloat(value).toLocaleString('en-US', {
//         style: 'decimal',
//         maximumFractionDigits: 2,
//         minimumFractionDigits: 2
//     });
// });
document.getElementById("taxForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var fullName = document.getElementById("fullName").value;
    var income = parseInt(document.getElementById("income").value);
    var dependents = parseInt(document.getElementById("dependents").value);

    var taxAmount = calculateIncomeTax(income, dependents);
    var taxRate = calculateTaxRate(income);

    var result = document.getElementById("resultTax");
    result.innerHTML = `<i class='bx bxs-hand-right'></i><p>Họ và tên:  ${fullName} </p><p>Thuế thu nhập cá nhân phải trả:  ${taxAmount.toLocaleString()}  triệu đồng</p><p>Thuế suất: ${taxRate}%</p>`;
});

function calculateIncomeTax(income, dependents) {
    var taxableIncome = income - 4000000 - (dependents * 1600000);

    if (taxableIncome <= 60000000) {
        return taxableIncome * 0.05;
    } else if (taxableIncome <= 120000000) {
        // return 60000000 * 0.05 + (taxableIncome - 60000000) * 0.1;
        return taxableIncome * 0.1;


    } else if (taxableIncome <= 210000000) {
        // return 60000000 * 0.05 + 60000000 * 0.1 + (taxableIncome - 120000000) * 0.15;
        return taxableIncome * 0.15;
    } else if (taxableIncome <= 384000000) {
        // return 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + (taxableIncome - 210000000) * 0.2;
        return taxableIncome * 0.2;
    } else if (taxableIncome <= 624000000) {
        // return 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + 174000000 * 0.2 + (taxableIncome - 384000000) * 0.25;
        return taxableIncome * 0.25;
    } else if (taxableIncome <= 960000000) {
        // return 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + 174000000 * 0.2 + 240000000 * 0.25 + (taxableIncome - 624000000) * 0.3;
        return taxableIncome * 0.3;
    } else {
        // return 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + 174000000 * 0.2 + 240000000 * 0.25 + 336000000 * 0.3 + (taxableIncome - 960000000) * 0.35;
        return taxableIncome * 0.35;
    }
}

function calculateTaxRate(income) {
    if (income <= 60000000) {
        return 5;
    } else if (income <= 120000000) {
        return 10;
    } else if (income <= 210000000) {
        return 15;
    } else if (income <= 384000000) {
        return 20;
    } else if (income <= 624000000) {
        return 25;
    } else if (income <= 960000000) {
        return 30;
    } else {
        return 35;
    }
}


// TÍNH TIỀN CÁP
document.getElementById("customerType").addEventListener("change", function () {
    var connectionsInput = document.getElementById("connections");
    var customerType = this.value;
    if (customerType === "business") {
        connectionsInput.disabled = false;
    } else {
        connectionsInput.disabled = true;
    }
});

document.getElementById("billForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var customerCode = document.getElementById("customerCode").value;
    var customerType = document.getElementById("customerType").value;
    var connections = parseInt(document.getElementById("connections").value);
    var premiumChannels = parseInt(document.getElementById("premiumChannels").value);

    var processingFee, basicServiceFee, premiumChannelFee, totalBill;

    if (customerType === "business") {
        processingFee = 15;
        basicServiceFee = 75 + (connections - 10) * 5;
        premiumChannelFee = 50 * premiumChannels;
    } else {
        processingFee = 4.5;
        basicServiceFee = 20.5;
        premiumChannelFee = 7.5 * premiumChannels;
    }

    totalBill = processingFee + basicServiceFee + premiumChannelFee;

    var result = document.getElementById("resultTienCap");
    result.innerHTML = "<p><i class='bx bxs-hand-right'></i> Mã khách hàng: " + customerCode + " | Tổng hóa đơn: $" + totalBill.toFixed(2) + "</p>";
});