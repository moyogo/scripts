var cnames = {

'L':"Left_To_Right",
"R":"Right_To_Left",
"AL":"Arabic_Letter",
"EN":"European_Number",
"ES":"European_Separator",
"ET":"European_Terminator",
"AN":"Arabic_Number",
"CS":"Common_Separator",
"NSM":"Nonspacing_Mark",
"BN":"Boundary_Neutral",
"B":"Paragraph_Separator",
"S":"Segment_Separator",
"WS":"White_Space",
"ON":"Other_Neutral",
}





function escapeRegExp(string){
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}








function makeList (stream) {
	stream = stream.replace(/ /g,'')
	stream = stream.replace(/\u000A/g,'')
	var streamArray = [...stream]

	// remove duplicates
	const uniqueSet = new Set(streamArray)
	const cps = [...uniqueSet]

	// sort the items
	var categories = {}
	for (let i=0;i<cps.length;i++) {
		var group = U[cps[i]]
		if (categories[group]) categories[group] += cps[i]
		else categories[group] = cps[i]
		}
	
	
	// output the list 
	var out = '<table><tbody>\n'
	var keys = Object.keys(categories)
	keys.sort()

	// construct a table
	for (x=0;x<keys.length;x++) { console.log(keys[x],keys[x].length)
		out += '<tr class="main">'
		out += '<th class="sg" title="'+cnames[keys[x]]+'">'+keys[x]+'</th>'
		var count = [...categories[keys[x]]].length
        if (document.getElementById(keys[x]) === null) document.getElementById('EFT').style.display = 'block'
        else document.getElementById(keys[x]).style.display = 'block'
		out += '<td class="count">'+count+'</td>'
        charlist = [...categories[keys[x]]]
        out += '<td class="chars" dir="ltr">'
        for (i=0;i<charlist.length;i++) out += '<bdi>'+charlist[i]+'</bdi>'
        out += '</td>'
		out += '<td class="select">'
        out += '<span title="Copy to clipboard" onclick="console.log(this.parentNode); copyToClipboard(this.parentNode.previousSibling)"><img src="copy.png"></span>'
        out += ' <a title="Show a list with details." href="../../../app-analysestring/?chars='+encodeURI(categories[keys[x]])+'" target="_blank"><img src="share.png"></a>'
        out += '</td>'
		out += '</tr>\n'
        console.log('cats',categories[keys[x]])
		}
	out += '</tbody></table>'
	
	out += '<p class="total">Total characters: '+cps.length+"</p>"
	//out += '<p class="total">Total blocks: '+keys.length+"</p>"
	
	document.getElementById('out').innerHTML = out
	
}





function copyToClipboard (node) {
	//var oldContent = node.textContent
	//node.textContent=node.textContent.replace(/\u200B/g,'')
	node.contentEditable=true
	node.focus()
	document.execCommand('selectAll')
	document.execCommand('copy')
	node.contentEditable=false
	//node.textContent=oldContent
	}



function compareLists () {
    var left = document.getElementById('leftList').value
    var right = document.getElementById('rightList').value
    
    var leftArray = [...left]
    var rightArray = [...right]
    
    var leftResult = ''
    var rightResult = ''
    var bothResult = ''
    
    for (let i=0;i<leftArray.length;i++) {
        var found = false
        for (let j=0;j<rightArray.length;j++) {
            if (leftArray[i] === rightArray[j]) { 
				found = true
				if (! bothResult.match(leftArray[i])) bothResult += leftArray[i]
				break
				}
            }
        if (! found && ! leftResult.match(leftArray[i])) leftResult += leftArray[i]+' '
        }
    document.getElementById('leftOut').textContent = leftResult

    for (let i=0;i<rightArray.length;i++) {
        var found = false
        for (let j=0;j<leftArray.length;j++) {
            if (rightArray[i] === leftArray[j]) { found = true; break }
            }
        if (! found && ! rightResult.match(rightArray[i])) rightResult += rightArray[i]+' '
        }
    document.getElementById('rightOut').textContent = rightResult
	
	var bothArray = [...bothResult]
	bothArray = bothArray.filter((x, i, a) => a.indexOf(x) == i)
    document.getElementById('bothOut').textContent = bothArray.join(' ')

    }





