//init speechsynth api
const synth = window.speechSynthesis

//dom elements
const textForm = document.querySelector("form")
const inputText = document.querySelector("#input-text")
const voiceSelect = document.querySelector("#voice-select")
const rate = document.querySelector("#rate")
const rateValue = document.querySelector("#rate-value")
const pitch = document.querySelector("#pitch")
const pitchValue = document.querySelector("#pitch-value")

//init voices array

let voices = []

const populateVoiceList = () => {
    voices = synth.getVoices()
    //loop through voices
    voices.forEach(voice => {
        //create option element
        const option = document.createElement("option");
        //fill the option with voice and lang
        option.textContent = voice.name + "(" + voice.lang + ")"

        option.setAttribute("data-lang", voice.lang)
        option.setAttribute("data-name", voice.name)

        voiceSelect.appendChild(option);
    })
}

populateVoiceList()

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList
}

//speak

const speak = () => {
    //check if speaking

    if (synth.speaking) {
        console.error("Already speaking")
        return
    }

    if (inputText.value !== "") {
        //get spech text
        const speechText = new SpeechSynthesisUtterance(inputText.value)
        speechText.onend = e => {
            console.log("Done speaking.")
        }

        //speech error

        speechText.onerror = e => {
            console.error("Something went wrong.")
        }

        //select voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speechText.voice = voice
            }
        })

        //set pitch and rate
        speechText.rate = rate.value
        speechText.pitch = pitch.value
        //speak
        synth.speak(speechText)
    }
}
//event listeners

textForm.addEventListener("submit", e => {
    e.preventDefault()
    speak()
    inputText.blur()
})

//rate and pitch value change

rate.addEventListener("change", e => {
    rateValue.textContent = rate.value
})
pitch.addEventListener("change", e => {
    pitchValue.textContent = pitch.value
})

voiceSelect.addEventListener("change", e => {
    speak()
})
