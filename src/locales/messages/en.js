export default {
  general: {
    HOME: "Home",
    ABOUT: "About",
    START: "Start",
    TITLE: "SDG Proposer Tool",
    SUBTITLE: "Connect your ideas and proposals to UN development goals and measurable outcomes",
    EXPLANATION: "The <b>Sustainable Development Goals SDG Tool</b> is made to help you include SDGs in your proposal development process. \
                  </br>This application will guide you through four selection steps:\
                  </br>- SGD Goals selection\
                  </br>- Subgoals selection\
                  </br>- Key Performance Indicator selection\
                  </br>- Universal Human Rights Index selection\
                  </br></br>For more info about the SDGs: \
                  <a href='https://sdgs.un.org/goals' target='_blank'>https://sdgs.un.org/goals</a>\
                  </br>To learn more about how Cardano is focused on social, economic and environmental issues: \
                  <a href='https://www.sustainableada.com/' target='_blank'>https://www.sustainableada.com/</a>",
    MADE_BY: "Made by Catalyst Community for the Catalyst Community",
    DONATE: "If you want to support the development of the voter tool you can donate some ADA to:",
    TEXT_COPIED: "Successfully copied!",
    TEXT_NOT_COPIED: "Failed to copy to clipboard!",
    GOAL_ALREADY_SELECTED: '"{title}" already selected.',
  },
  step: {
    STEP1_SUBTITLE: "</br><b>What is your proposal about? Connect your proposed project to real world measurable impact.</b></br>Select your SDG Goals or choose from the available <em>tags</em> and the tool will automatically add goals into your draft.",
    SELECTED_GOALS: "<b>Selected goals</b> (refine them before the next step):",
    STEP2_SUBTITLE: "</br><b>Choose your sub-goals from the list or type for search specific sub-goals.</b></br>The available SDG sub-goals are based on the following SDG Goals you selected in the previous step.",
    SELECTED_SUBGOALS: "<b>Selected sub-goals</b> (refine them before the next step):",
    STEP3_SUBTITLE: "</br><b> Choose the metrics you want to include in your proposal.</b></br>You can find below the measurements metrics related to the <em>SDG sub-goals</em> you selected in the previous step.",
    STEP4_SUBTITLE2: "</br><b>Choose the UHRI you want to include in your proposal.</b></br>Select between the different criteria to filter the UHRI search",
    STEP4_SUBTITLE3: "</br><b>Choose the UHRI you want to include in your proposal.</b></br>You can find below the indexes related to the filters you selected.",
    SELECTED_FILTERS: "<b>Selected filters to the UHRI Selection</b>",
    STEP5_SUBTITLE: "</br><b>Review your Selection!</b></br>- You can find below the summary of the Goals and Metrics you've selected. You may <em>copy-paste</em> into <b>IdeaScale</b> for further edition.</br>- We also recommend adding your specific <em>Key Performance Indicator (KPI)</em> for each measurement to increase the audibility of the proposal.",
    SELECTED_SUMMARY: "Summary of all selected Goals and Metrics"
  },
  sdg: {
    HOME_TITLE: "Sustainable Development Goals (SDG) Selection",
    HOME_SUBTITLE: "What are the Sustainable Development Goals?",
    HOME_MSG: "The 17 Sustainable Development Goals (SDGs) are the heart of a blueprint for peace and prosperity for people and the planet, now and into the future.\
              They are an urgent call for action by all countries - developed and developing - in a global partnership.\
              Such goals recognize that ending poverty and other deprivations must go hand-in-hand with strategies that\
              improve health and education, reduce inequality, and spur economic growth – all while tackling climate change\
              and working to preserve our oceans and forests.\
              {enter}{enter}\
              For more information: {informationUrl}",
    HOME_PROCEED_MSG: "<b>Proceed the SDG selection process to choose the goals, subgoals and kpi to include in your proposal.</b>",
  },
  uhri: {
    HOME_TITLE: "Universal Human Rights Indexes (UHRI) Selection",
    HOME_SUBTITLE: "What are the Universal Human Rights Indexes (UHRI)?",
    HOME_MSG: "The UHRI is a central repository to facilitate access to human rights information and recommendations issued by the\
              United Nations monitoring system.\
              {enter}{enter}\
              It aims at assisting in the implementation of such recommendations and facilitating the work of stakeholders in support of\
              such implementation efforts. It also adds to human rights' analysis including: the identification of who may be at risk of\
              being left behind; and mapping of systematic, recurring and unresolved human rights issues.\
              {enter}{enter}\
              For more information: {informationUrl}\
              {enter}\
              For data access: {dataUrl}",
    HOME_PROCEED_MSG: "Open the UHRI selection process to choose and edit the indexes to include in your proposal.",
    SELECTED_INDEXES: "Selected Universal Human Rights Indexes",
  },
  phdi: {
    HOME_TITLE: "Planetary pressures-adjusted Human Development Index (PHDI) Selection",
    INFOGRAPHIC_TITLE: "PHDI Inforgraphic",
    USABILITY_TITLE: "Why is the PHDI useful?",
    USABILITY_TEXT: "The PHDI has been developed to signal changes that are needed to navigate the Anthropocene.\
                    This index can help assess and encourage action that both advances human development and eases planetary pressures.\
                    {0}{0}\
                    The proposed adjustment to the HDI recognizes that easing the disruptions of planetary processes require reducing\
                    CO2 emissions and closing material cycles.\
                    {0}{0}\
                    The PHDI focuses on CO2 emissions and material flows but this does not imply that all other environmental concerns\
                    are less important or urgent, though reductions in the two included indicators reflect a move towards the\
                    transformation that is needed to ease some of the biggest pressures on the planet.",
    INTERPRETATION_TITLE: "What is the interpretation of the PHDI?",
    INTERPRETATION_TEXT: "The PHDI suggests that progress in human development has increased at a slower rate because planetary pressures\
                          have also risen. One must be careful in interpreting the PHDI because it does not account for individual countries’\
                          responsibilities — current or historical.  The trajectory of countries over the last three decades shows different\
                          paths for different levels of human development. Countries with low and medium levels of human development have\
                          been able to improve significantly social and economic conditions without imposing a high burden on planetary balances.\
                          But improvements in wellbeing and rising pressure on the planet have been coupled in countries with high and very\
                          high human development.  The PHDI is intended to incentivise change, providing a metric for countries to assess their\
                          own progress over time, highlighting those countries that are moving in the right direction so that others can learn from them.\
                          This interpretation is also consistent with the open-endedness of the human development journey in the Anthropocene.\
                          It is meant to provide a sense of possibility: how to achieve high levels of the HDI with lower emissions and resource use.",
    HOME_MSG_SELECTION: "{msgCountry} is ranked {msgHdiRank} (Human Development Index) and when adjusted for the Planetary pressures is ranked\
                        {msgHdiRankMinusDiff} a {msgRankDeriv} of {msgHdiDiffRank}.\
                        {enter}{enter}\
                        In 2021 it had a Human Development Index (HDI) value of {msgHdi} that when adjusted for the\
                        Planetary pressures-adjusted HDI (PHDI) had a value of {msgPhdiValue},\
                        a difference of {msgHdiDiffValuePerc}.\
                        {enter}{enter}\
                        The Planetary Pressures adjustment factor of {msgAdjFactor} is made up of the SDG9.4\
                        Carbon dioxide emissions per capita (production) 2020 of {msgCooPercap} tonnes\
                        (indexed value {msgCooIndex}), and the SDG8.4 and 12.2 Material footprint per\
                        capita of {msgMaterialPercap} tonnes (indexed value {msgMaterialIndex}).\
                        {enter}{enter}\
                        For more information about the details of the PHDI please reference:\
                        {enter}\
                        {msgInfoLink1}\
                        {enter}\
                        {msgInfoLink2}\
                        {enter}{enter}\
                        The specific SDG targets\
                        {enter}\
                        {msgSdgLink1}\
                        {enter}\
                        {msgSdgLink2}\
                        {enter}\
                        {msgSdgLink3}\
                        {enter}{enter}\
                        Source data:\
                        {enter}\
                        {msgSourceData} (table 7)",
  }
}
