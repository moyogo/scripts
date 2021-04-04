// prompts will be inserted into the title attributes of various headers after page upload


var contentPrompts = {
'cursive':"Is this script cursive? Is the basic shape of a letter radically changed? Is it sometimes not cursive? Are there any special features to note? Are Unicode joiner and non-joiner characters needed to override default joining behaviours?",

'gsub':"Are special glyph forms needed, depending on the context in which a character is used? Do glyphs interact in some circumstances?",

"gpos":"Are there requirements to position diacritics or other items specially, depending on context? Does the script have multiple diacritics competing for the same location relative to the base?",

"baselines":"Does the script have special requirements for baseline alignment between mixed scripts and in general? Is line height special for this script? Are there other aspects that affect line spacing, or positioning of items vertically within a line?",

"fontstyle":"Are italicisation, bolding, oblique, etc relevant? Do italic fonts lean in the right direction? Is synthesised italicisation problematic? Are there other problems relating to bolding or italicisation - perhaps relating to generalised assumptions of applicability?",

"graphemes":"Do Unicode grapheme clusters appropriately segment character units for the script? Are there special requirements for the following operations: forwards/backwards deletion, cursor movement & selection, character counts, searching & matching, text insertion, line-breaking, justification, case conversions, sorting?",

"word":"Are words separated by spaces, or other characters? Are there special requirements when double-clicking  on the text? Are words hyphenated?",

"phrase":"What characters are used to indicate the boundaries of phrases, sentences, and sections?",

"otherinline":"Any other form of highlighting or marking of text, such as underlining, numeric overbars, etc. What characters or methods (eg. text decoration) are used to convey information about a range of text?\n• If lines are drawn alongside, over or through the text, do they need to be a special distance from the text itself?\n• Is it important to skip characters when underlining, etc?\n• How do things change for vertically set text?\n• (See also the following sections which deal with specific purposes.)",

"quotations":"What characters are used to indicate quotations?\n• Do quotations within quotations use different characters?\n• What characters are used to indicate dialogue?",

"abbrev":"What characters are used to indicate abbreviation, ellipsis &amp; repetition?",

"emphasis":"How are emphasis and highlighting achieved?\n• If lines are drawn alongside, over or through the text, do they need to be a special distance from the text itself?\n• Is it important to skip characters when underlining, etc?\n• How do things change for vertically set text?",

"bracketing":"What parentheses or brackets are used?",

"otherpunctuation":"Punctuation not already mentioned, such as dashes, connectors, separators, etc.",

"inlinenotes":"What mechanisms, if any, are used to create *inline* notes and annotations? (For referent-type notes such as footnotes, see below.)",

"linebreak":"Are there special rules about the way text  wraps when it hits the end of a line?\n• Does line-breaking wrap whole 'words' at a time, or characters, or something else (such as syllables in Tibetan and Javanese)?\n• What characters should not appear at the end or start of a line, and what should be done to prevent that?",

"hyphenation":"Is hyphenation used, or something else? What rules are used? What difficulties exist?",

"justification":"Does text in a paragraph needs to have flush lines down both sides?\n• Does the script allow punctuation to hang outside the text box at the start or end of a line?\n• Where adjustments are need to make a line flush, how is that done?\n• Does the script shrink/stretch space between words and/or letters?\n• Are word baselines stretched, as in Arabic?\n• What about paragraph indents?",

"letterspace":"Does the script create emphasis or other effects by spacing out the words, letters or syllables in a word?  (For justification related spacing, see above).",
"lists":"Are there list or other counter styles in use?  If so, what is the format used? Do counters need to be upright in vertical text? Are there other aspects related to counters and lists that need to be addressed?",

"initials":"Does the script use special styling of the initial letter of a line or paragraph, such as for drop caps or similar? How about the size relationship between the large letter and the lines alongide? where does the large letter anchor relative to the lines alongside? is it normal to include initial quote marks in the large letter? is the large letter really a syllable? Are dropped, sunken, and raised types found? etc.",

"generallayout":"How are the main text area and ancilliary areas positioned and defined? Are there any special requirements here, such as dimensions in characters for the Japanese kihon hanmen? The book cover for scripts that are read right-to-left scripts is on the right of the spine, rather than the left.  When content can flow vertically and to the left or right, how to specify the location of objects, text, etc. relative to the flow? Do tables and grid layouts work as expected? How do columns work in vertical text? Can you mix block of vertical and horizontal text? Does text scroll in a different direction?",

"grids":"Does the script have special requirements for character grids or tables?",
"footnotes":"Does the script have special requirements for notes, footnotes, endnotes or other necessary annotations of this kind? (There is a section above for purely inline annotations, such as ruby or warichu. This section is more about annotation systems that separate the reference marks and the content of the notes.)",

"interaction":"Are vertical form controls needed? Are scroll bars in an unusual position? Other special requirements for user interaction?",

"headers":"Are there special conventions for page numbering, or the way that running headers and the like are handled?",

"writingstyles":"How are fonts grouped into recognisable writing styles? How is each writing style used?",

"transforms":"Is the orthography bicameral? Are there other character pairings, especially when transforms are needed to convert between the two?",

}





function setContentPrompts () {
	if (contentPrompts) {
		// set the prompts in the titles
		for (thePrompt in contentPrompts) {
			var node = document.getElementById(thePrompt)
			if (node) {		 	
				var heading = node.querySelector('h3')
				if (heading) heading.title = contentPrompts[thePrompt]
				
				var promptPara = node.querySelector('.prompts')
				if (promptPara) promptPara.textContent = contentPrompts[thePrompt]
				}
			 }
			 
		// set the prompts in the initial paras of shaping and pagelayout
		for (thePrompt in contentPrompts) {
			var node = document.getElementById(thePrompt+'Inline')
			if (node) node.title = contentPrompts[thePrompt]
			}

		contentPrompts = {}
		}
	}




function showAbout (node, script, language) {
// Displays/hides the 'About this document' details

if (node.innerHTML == '') {
	console.log(node.parentNode)
	node.innerHTML = `
	<p class="instructions"><span class="leadin">Transcriptions.</span> Unless in parentheses, the transcriptions in italics that follow ${script} text are a <a href="../glossary/#transliteration" class="termref">transliteration</a> developed for these pages. Those in parentheses follow one or more commonly used <a href="../glossary/#transcription" class="termref">transcription</a> methods. Transcriptions in <span style="white-space:nowrap;">⌈ corner brackets ⌋</span> are either phonemic or phonetic.</p>
	<p class="instructions noprint"><span class="leadin">Character lists.</span> Colours and annotations on panels listing characters are relevant to their use for the ${language} language. Panels with a yellow background contain commonly used characters for that language.</p>
	<p class="instructions noprint"><span class="leadin">Detailed topic information.</span> Footnote  links with an arrow alongside take you to more detailed information on the current topic.</p>
	<p class="instructions noprint"><span class="leadin">Showing code points for examples.</span>Clicking on ${language}  examples shows a list of the characters in that example. </p>
	<p class="instructions noprint"><span class="leadin">Changing fonts.</span>Click on the vertical blue bar (bottom right) to change font settings for the sample text.</p>
	` 
	node.parentNode.open = true
	}
else { 
	node.parentNode.open = false
	node.innerHTML = ''
	}
}


function addUsageAdvice (script) {
	// Add a para to the intro 
	
	document.getElementById('usage').outerHTML = '<p class="instructions">Click on characters or character names to reveal detailed information. (By default, this happens as the cursor moves over some items, but the floating menu to the right provides a toggle for that.) The same information also appears in the companion document, <a href="block" class="linkHighlight">'+script+' character notes</a>. Click on <span class="ex">highlighted</span> examples to see a list of the characters they contain.</p>'
	}


function addAnalytics () {
    // add the stuff at the bottom to generate lists and the index
    
    document.getElementById('analytics').outerHTML = `
    <details>
    <summary class="prompts">Show stats</summary>

    <table id="charCountList">
    <tr><th>Main</th><td id="mainCharList"></td><td id="mainCharListTotal"></td></tr>
    <tr><th>Auxiliary</th><td id="auxCharList"></td><td id="auxCharListTotal"></td></tr>
    <tr><th>Archaic</th><td id="archaicCharList"></td><td id="archaicCharListTotal"></td></tr>
    <tr><th>Other</th><td id="otherCharList"></td><td id="otherCharListTotal"></td></tr>
    <tr><th>Deprecated</th><td id="deprecatedCharList"></td><td id="deprecatedCharListTotal"></td></tr>

    <tr><th>Letter</th><td id="letterCharList"></td><td id="letterCharListTotal"></td></tr>
    <tr><th>Mark</th><td id="markCharList"></td><td id="markCharListTotal"></td></tr>
    <tr><th>Number</th><td id="numberCharList"></td><td id="numberCharListTotal"></td></tr>
    <tr><th>Punctuation</th><td id="punctuationCharList"></td><td id="punctuationCharListTotal"></td></tr>
    <tr><th>Symbols</th><td id="symbolCharList"></td><td id="symbolCharListTotal"></td></tr>
    <tr><th>Separators etc</th><td id="otherCharList"></td><td id="otherCharListTotal"></td></tr>
    </table>
    </details>
    `
    +
    `<details>
    <summary class="prompts">Make index</summary>
    <hr>
    <h1>Make the index here</h1>

    <p>Click here to start (and every time you reload the page)</p>
    <p><button onClick="makeIndexObject()">Make Index Object</button></p>

    <p><input id="allchars" type="text" placeholder="List of all chars appears here"></p>
    <p>Main <input id="mainIndexList" type="text" placeholder="List of all common chars appears here"></p>
    <p>Aux <input id="auxIndexList" type="text" placeholder="List of all infrequent chars appears here"></p>
    <p>Archaic <input id="archaicIndexList" type="text" placeholder="List of all archaic chars appears here"></p>
    <p>Deprecated <input id="deprecatedIndexList" type="text" placeholder="List of all infrequent chars appears here"></p>
    <p>Other <input id="otherIndexList" type="text" placeholder="List of all other chars appears here"></p>
    <p>Unknown <input id="unknownIndexList" type="text" placeholder="List of unknown status chars appears here"></p>

    <p>For each list, <a href="/scripts/apps/listcategories/" target="_blank">Triage by category</a>.</p>
    <p>Copy each General Category to the picker and sort into lines, one for each of the different subsections in the index for that category.</p>
    <p>Copy each line, one at a time to the input box below, and press Make Markup.</p>

    <p><input id="in" type="text" placeholder="Index line here"> <button onClick="makeMarkup()">Make markup</button></p>

    <p><textarea id="out" style="width: 80%;height:300px;"></textarea>
    </p>
    <p>Take the output and copy it to the document in the correct place in the index.</p>
    `
    }


