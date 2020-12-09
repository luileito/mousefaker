# MouseFaker

Nowadays it is really straightforward to capture behavioral data by unobtrusively tracking mouse cursor movements.
Thus, a disconcerting privacy issue could easily emerge because of unethical practices and uncontrolled use of technology.

This Chrome extension prevents user profiling by implementing the adversarial noise technique described in:

  * L.A. Leiva, I. Arapakis, C. Iordanou (2021).
  **My Mouse, My Rules: Privacy Issues of Behavioral User Profiling via Mouse Tracking.**
  Proc. *CHIIR*.

## Install

This extension is not yet available in the Chrome Web store,
so you need to enable the developer mode:

> Click the Chrome menu icon and select Extensions from the Tools menu.
> Ensure that the "Developer mode" checkbox in the top right-hand corner is checked.
> -- https://developer.chrome.com/docs/extensions/mv2/faq/#faq-dev-01

Then you can clone this repo and install the extension
by clicking on the "Load unpacked" button at the top-left corner
and point to the `src` directory.

## Configuring

Currently there are two options you can customize:

1. Noise level: any value between 0 and 1.
The higher this number, the more noisy your mouse movements will be.
Since 0 denotes no noise at all, you probably want to set any number greater than 0.
This is a _global_ setting, which means that it applies to every website you visit.

2. Enable/disable on the domain of the current tab.
By default the extension is enabled on all websites you visit.
By unticking this checkbox you will disable the extension on the current website.
This is a _local_ setting, which means that it applies only to the currently opened tab.

**Note:** After changing any of these settings, you have to reload the page for the new options to be applied.

## Test

Open `src/html/test.html` and take a look at the JavaScript console.
For every legitimate mouse movement (flagged as "true") you will see an additional mouse movement (flagged as "false").
