function show() {
    var a = document.getElementById('input').value;
    if (!check_valid(a))
        alert("invalid permutation")
	alert(get_intermediary('swap', a));
}

function check_valid(a) {
    for (let i = 1; i <= a.length; i++) {
        if(a.indexOf(parseInt(i, 10)) === -1){
            return false;
        }
    }
    return true
}

function get_index_dic(n) {
    return undefined;
}

function get_index_swap(n) {
    return undefined;
}

function get_index_inc(n) {
    return undefined;
}

function get_index_des(n) {
    return undefined;
}

function get_index(algorithm, n) {
    switch (algorithm) {
        case 'dictionary':
            return get_index_dic(n);
        case 'increment':
            return get_index_inc(n);
        case 'descend':
            return get_index_des(n);
        case 'swap':
            return get_index_swap(n);
    }

}

function get_intermediary_dic(n) {
	var inter = new Array(n.length - 1);
	for(let i = 0; i < n.length; i++) {
		let num = parseInt(n[i], 10);
		if(num === 1) continue;
		let cnt = 0;
		for(let j = i+1; j < n.length; j++) {
			if(n[i] > n[j]) cnt++;
		}
		inter[i+1] = cnt;
	}
	return inter.join('');
}

function get_intermediary_inc(n) {
	var inter = new Array(n.length - 1);
	for(let i = 0; i < n.length; i++) {
		let num = parseInt(n[i], 10);
		if(num === 1) continue;
		let cnt = 0;
		for(let j = i+1; j < n.length; j++) {
			if(n[i] > n[j]) cnt++;
		}
		inter[n.length+1-num] = cnt;
	}
	return inter.join('');
}

function get_intermediary_des(n) {
	var inter = new Array(n.length - 1);
	for(let i = 0; i < n.length; i++) {
		let num = parseInt(n[i], 10);
		if(num === 1) continue;
		let cnt = 0;
		for(let j = i+1; j < n.length; j++) {
			if(n[i] > n[j]) cnt++;
		}
		inter[num-1] = cnt;
	}
	return inter.join('');
}

function get_intermediary_swap(n) {
    var directions = new Array(n.length + 1);
	directions.fill(0);	 //0代表方向朝左，1代表朝右
	var N = n.length;
	var inter = new Array(N - 1);
	var pos = new Array(N + 1);
	for(let i = 0; i < N; i++) {
		pos[parseInt(n[i])] = i;
	}
	if(pos[2] < pos[1]) inter[1] = 1; //b2
	else inter[1] = 0;
	for(let i = 2; i < N; i++) {
		let k = i+1; //考虑当前数字k
		let bk_1 = inter[k-2];
		if(k % 2 === 1) {
			if(bk_1 % 2 === 1) directions[k] = 1;
		} else {
			let bk_2 = inter[k-3];
			if((bk_1 + bk_2) % 2 == 1) directions[k] = 1;
		}
		let cnt = 0;
		if(directions[k] == 1) {
			for(let j = 0; j < pos[k]; j++) {
				if(parseInt(n[j]) < k) cnt++;
			}
		} else {
			for(let j = pos[k]+1; j < N; j++) {
				if(parseInt(n[j]) < k) cnt++;
			}
		}
		inter[i] = cnt;
	}
	return inter.join('');
}

function get_intermediary(algorithm, n) {
    switch (algorithm) {
        case 'dictionary':
            return get_intermediary_dic(n);
        case 'increment':
            return get_intermediary_inc(n);
        case 'descend':
            return get_intermediary_des(n);
        case 'swap':
            return get_intermediary_swap(n);
    }
}

function next_permutation_dic(n) {
    var intermediary = get_intermediary_dic(n)
}

function next_permutation_inc(n) {
    var intermediary = get_intermediary_inc(n)

}

function next_permutation_des(n) {
    var intermediary = get_intermediary_des(n)

}

function next_permutation_swap(n) {
    var intermediary = get_intermediary_swap(n)

}

function next_permutation(algorithm, n) {
    switch (algorithm) {
        case 'dictionary':
            return next_permutation_dic(n);
        case 'increment':
            return next_permutation_inc(n);
        case 'descend':
            return next_permutation_des(n);
        case 'swap':
            return next_permutation_swap(n);
    }
}