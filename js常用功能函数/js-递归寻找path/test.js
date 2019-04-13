var treeObj = {
	key1: 'str1',
	key2: 'str2',
	key3: {
		key4: 'str4',
		key5: {
			key6: 'str6',
			key7: 'str7'
		},
		key8: 'str8'
	},
	key9: 'str9',
	key10: {
		key11: 'str11',
		key12: {
			key13: 'str13',
			key14: 'str14'
		},
		key15: 'str15'
	}
};
var getPath = function(tree, str) {
	var resPath = {};
	var tmpPath = [];

	function findPath(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				tmpPath.push(key);
				if (typeof obj[key] === 'object') {
					findPath(obj[key]);
				} else {
					if (!resPath[obj[key]]) {
						resPath[obj[key]] = [];
					}
					resPath[obj[key]] = resPath[obj[key]].concat(tmpPath);
				}
			}
			tmpPath.pop();
		}
	}
	findPath(tree);
	return (resPath[str]);
};
console.log(getPath(treeObj, 'str14'));


const safeGet = (data, path) => {
	/* TODO */
	let pathTmp = path.split('.');
	let output;
	if (pathTmp.length === 1) {
		output = data[pathTmp[0]];
	} else if (data[pathTmp[0]] === undefined) {
		output = undefined;
	} else {
		let n_data = data[pathTmp[0]];
		pathTmp.shift();
		output = safeGet(n_data, pathTmp.join('.'))
	}
	return output;
}

var data = {
	a: {
		b: {
			c: 'ScriptOJ'
		}
	}
}
console.log(safeGet(data, 'a.b'));
console.log(safeGet(data, 'a.b.d'));
console.log(safeGet(data, 'a.b.c')) // => scriptoj
console.log(safeGet(data, 'a.b.c.d')) // => 返回 undefined
console.log(safeGet(data, 'a.b.c.d.e.f.g')) // => 返回 undefined
console.log('ScriptOJ') // => 打印 ScriptOJ