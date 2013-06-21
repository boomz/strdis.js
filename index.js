module.exports.stringDistance = function(s1, s2){
	var p = 0.2,
		q = 0.3;
		max = 15;
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	// console.log('-----------\n' + s1 + '\n' + s2);
	// console.log('common: ' + (commonWords(s1, s2)/Math.min(numberOfWords(s1), numberOfWords(s2))));
	return 	p*(!(isSubsequence(s1, s2) || isSubsequence(s2, s1))) 
			+ q*(1-commonWords(s1, s2)/Math.min(numberOfWords(s1), numberOfWords(s2)))
			+ (1-p-q)*(sift3(s1, s2, max)/max);
}

function sift3 (s1, s2, max) {
	// sift3: http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html
	if (s1 == null || s1.length === 0) {
	if (s2 == null || s2.length === 0) {
			return 0;
		} else {
			return Math.min(s2.length, max);
		}
	}

	if (s2 == null || s2.length === 0) {
		return Math.min(s1.length, max);
	}

	var c = 0;
	var offset1 = 0;
	var offset2 = 0;
	var lcs = 0;
	var maxOffset = 5;

	while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
		if (s1[c + offset1] == s2[c + offset2]) {
			lcs++;
		} else {
			offset1 = 0;
			offset2 = 0;
			for (var i = 0; i < maxOffset; i++) {
				if ((c + i < s1.length) && (s1[c + i] == s2[c])) {
					offset1 = i;
					break;
				}
				if ((c + i < s2.length) && (s1[c] == s2[c + i])) {
					offset2 = i;
					break;
				}
			}
		}
		c++;
	}
	return Math.min((s1.length + s2.length) /2 - lcs, max);
}

// console.log(stringDistance('hamed zamani', 'hamed'));
// console.log(stringDistance('hamed zamani', 'hamed zamani'));
// var s = stringDistance;

function isSubsequence (s1, s2){
	for (var c in s1){
		if (s2.indexOf(s1[c]) != -1){
			s2 = s2.substring(s2.indexOf(s1[c])+1, s2.length);
		}
		else
			return false;
	}
	return true;
}

function commonWords (s1, s2){
	var words = s2.split(/[ ,]+/);
	var result = 0;
	words.forEach(function (v, i){
		if (s1.indexOf(v) != -1)
			result++;
	});
	return result;
}

function numberOfWords(s1){
	return s1.split(/[ ,]+/).length;
}

// console.log(this.stringDistance('hamed', 'hamed'));
// console.log(this.stringDistance('hmd', 'hamed'));
// console.log(this.stringDistance('hamed zamani', 'hamed zamany'));
// console.log(this.stringDistance('amir saboury', 'amir jan sabouri'));
// console.log(this.stringDistance('amir saboury', 'hamed zamani'));
// console.log(this.stringDistance('amir saboury', 'ali akbar saboury'));
// console.log(this.stringDistance('hamed zamani', 'mahdi zamani'));
