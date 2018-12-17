function show() {
    var a = document.getElementById('input').value;
    if (!check_valid(a))
        alert("invalid permutation")
	//var tmp = get_intermediary('dictionary', a);
	//console.log(tmp);
	//console.log(get_next_intermediary(tmp, 'inc', -3));
	console.log(next_permutation_swap(a, 1));
	
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


function get_next_intermediary(intermediary, mode, step=1) { //mode='inc'或'des'，决定是递增进位制数还是递减。step表示得到之后第几个中介数，取负数代表之前的第几个中介数
	let m = intermediary.length;  //中介数的长度m = N-1，N是全排列的长度
	let N = m + 1;
	var inter = intermediary.split('').reverse();
	for(let i = 0; i < m; i++) inter[i] = parseInt(inter[i], 10);
	var carry = new Array(N);
	if(mode === 'inc') {
		for(let i = 0; i < N; i++) carry[i] = i + 1;
	} else if (mode === 'des') {
		for(let i = 0; i < N; i++) carry[i] = N + 1 - i;
	}
	if(step > 0) {
		for(let l = 0; l < step; l++) {		
			inter[0]++;
			let i = 0;
			while(inter[i] == carry[i+1]) {
				inter[i] = 0;
				inter[i+1]++;
				i++;
			}
		}
	} else if(step < 0) {
		for(let l = 0; l < -step; l++) {
			inter[0]--;
			let i = 0;
			while(inter[i] < 0){
				inter[i] += carry[i+1];
				inter[i+1]--;
				i++;
			}
			console.log(inter);
		}
	}
	return inter.reverse().join('');
}

function next_permutation_dic(n, step=1) {
    var intermediary = get_intermediary_dic(n);
	var inter = get_next_intermediary(intermediary, 'inc', step);
	var N = n.length;
	var p = new Array(N);
	var u = new Array(N);  //记录每一个数字是否已存在于排列中
	u.fill(0);
	for(let i = 0; i < N-1; i++) {
		let a = parseInt(inter[i]);
		let cnt = 0;
		for(let j = 0; j < N; j++) {
			if(!u[j]) cnt++;
			if(cnt == a + 1) {
				p[i] = (j+1).toString();
				u[j] = true;
				break;
			}
			
		}
	}
	for(let j = 0; j < N; j++) {
		if(!u[j]) {
			p[N-1] = (j+1).toString();
			break;
		}
	}
	return p.join('');
}

function next_permutation_inc(n, step=1) {
    var intermediary = get_intermediary_inc(n);
	var inter = get_next_intermediary(intermediary, 'inc', step);
	var N = n.length;
	var p = new Array(N);
	p.fill(0);
	for(let i = 0; i < N-1; i++) {
		let cnt = 0;
		for(let j = N-1; j >= 0; j--) {
			if(p[j] == 0) cnt++;
			if(cnt == parseInt(inter[i]) + 1) {
				p[j] = (N-i).toString();
				break;
				
			}
		}
	}
	for(let j = N-1; j >= 0; j--) {
		if(p[j] == 0) {
			p[j] = '1';
			break;
		}
	}
	return p.join('');
}

function next_permutation_des(n, step=1) {
    var intermediary = get_intermediary_des(n);
	var inter = get_next_intermediary(intermediary, 'des', step);
	var N = n.length;
	var p = new Array(N);
	p.fill(0);
	for(let i = N-2; i >= 0; i--) {
		let cnt = 0;
		for(let j = N-1; j >= 0; j--) {
			if(p[j] === 0) cnt++;
			if(cnt == parseInt(inter[i]) + 1) {
				p[j] = (i+2).toString();
				break;
			}
		}
	}
	for(let j = N-1; j >= 0; j--) {
		if(p[j] === 0) {
			p[j] = '1';
			break;
		}
	}
	return p.join('');
}

function next_permutation_swap(n, step=1) {
    var intermediary = get_intermediary_swap(n);
	var inter = get_next_intermediary(intermediary, 'des', step);
	var N = n.length;
	var p = new Array(N);
	p.fill(0);
	for(let k = N; k > 1; k--) {
		let bk = parseInt(inter[k-2]);
		let bk_1 = parseInt(inter[k-3]);
		let cnt = 0;
		if(k % 2 == 1) {
			if(bk_1 % 2 == 1) {
				for(let j = 0; j < N; j++) {
					if(p[j] == 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			} else {
				for(let j = N-1; j >= 0; j--) {
					if(p[j] == 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			}
		} else {
			let bk_2 = parseInt(inter[k-4]);
			if((bk_1 + bk_2) % 2 == 1) {
				for(let j = 0; j < N; j++) {
					if(p[j] == 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			} else {
				for(let j = N-1; j >= 0; j--) {
					if(p[j] == 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			}
		}
	}
	for(let j = N-1; j >= 0; j--) {
		if(p[j] === 0) {
			p[j] = '1';
			break;
		}
	}
	return p.join('');
}

function next_permutation(algorithm, n, step=1) {
    switch (algorithm) {
        case 'dictionary':
            return next_permutation_dic(n, step);
        case 'increment':
            return next_permutation_inc(n, step);
        case 'descend':
            return next_permutation_des(n, step);
        case 'swap':
            return next_permutation_swap(n, step);
    }
}