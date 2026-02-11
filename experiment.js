const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData("csv");
  },
});
let timeline = [];

const subject_id = jsPsych.randomization.randomID(10);

const irb = {
  // Which plugin to use
  type: jsPsychHtmlButtonResponse,
  // What should be displayed on the screen
  stimulus:
    '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
  // What should the button(s) say
  choices: ["Continue"],
};
// push to the timeline
timeline.push(irb);

const instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "In this experiment, you will see a series of words.<br>Please read the onscreen word aloud.<br>Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
  choices: [" "],
};
timeline.push(instructions);

var initialize = {
  type: jsPsychInitializeMicrophone,
};
timeline.push(initialize);

var time_through = 1;

const trials = {
  timeline: [
    {
      type: jsPsychHtmlAudioResponse,
      stimulus: `
    <p style="font-size:48px; color:black;">${jsPsych.timelineVariable(
      "stimulus"
    )}</p>
    <p>Speak the above word.</p>`,
      recording_duration: 3500,
      show_done_button: true,
      done_button_label: "Continue",
      allow_playback: true,
      record_again_button_label: "Record Again",
      accept_button_label: "Continue",
      on_finish: function (data) {
        const filename = `${subject_id}_${"block" + time_through}_${
          jsPsych.getProgress().current_trial_global
        }_${jsPsych.timelineVariable(stimulus)}_audio.webm`;
        jsPsychPipe.saveBase64Data("OINjRk5EIMi8", filename, data.response);
        // delete the base64 data to save space. store the filename instead.
        data.response = filename;
      },
    },
    // {
    //   type: jsPsychHtmlKeyboardResponse,
    //   choices: [""],
    //   stimulus: "",
    //   response_ends_trial: false,
    //   trial_duration: 1000,
    // },
  ],
  timeline_variables: [
    { stimulus: "O.K." },
    { stimulus: "OK" },
    { stimulus: "ok" },
    { stimulus: "Ok" },
    { stimulus: "ok ok" },
    { stimulus: "ok," },
    { stimulus: "ok!" },
    { stimulus: "Ok!" },
    { stimulus: "OK!" },
    { stimulus: "ok." },
    { stimulus: "OK." },
    { stimulus: "okay" },
    { stimulus: "Okay" },
    { stimulus: "OKAY" },
    { stimulus: "okay!" },
    { stimulus: "Okay!" },
    { stimulus: "okay." },
    { stimulus: "Okay." },
    { stimulus: "okayy" },
    { stimulus: "okey" },
    { stimulus: "oki" },
    { stimulus: "okie" },
    { stimulus: "okii" },
    { stimulus: "okk" },
  ],
  randomize_order: true,
};

const num_blocks = 4;

for (let block = 0; block < num_blocks; block++) {
  timeline.push(trials);
  time_through++;
}

const thanks = {
  type: jsPsychHtmlButtonResponse,
  choices: ["Continue"],
  stimulus:
    "Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back.<br><br>",
};
timeline.push(thanks);

jsPsych.run(timeline);
