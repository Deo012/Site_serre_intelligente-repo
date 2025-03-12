let dataTemperature = {
    title: "Temperature",
    value: "68°C",
    companyName: "Amazon",
    switch_state: false,
    toggleSwitchState: function () {
        this.switch_state = !this.switch_state;
        console.log(this.switch_state)
    }
}

let dataHumidite = {
    title: "Humidité",
    value: "48,2%",
    companyName: "Gaabor",
    switch_state: true,
    toggleSwitchState: function () {
        this.switch_state = !this.switch_state;
        console.log(this.switch_state)
    }
}

let dataCarbone = {
    title: "CO2",
    value: "20%",
    companyName: "Bando",
    switch_state: true,
    toggleSwitchState: function () {
        this.switch_state = !this.switch_state;
        console.log(this.switch_state)
    }
}

export let CardsData = [
    dataTemperature,
    dataHumidite,
    dataCarbone
]