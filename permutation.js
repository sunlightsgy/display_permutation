var permu_n = 0; //当前输入的位数
var fac = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]; 


function show() {
    //var a = document.getElementById('input').value;
    //if (!check_valid(a))
    //    alert("invalid permutation")
	//var tmp = perm2inter('dictionary', a);
	//console.log(tmp);
	//console.log(get_next_intermediary(tmp, 'inc', -3));
	var a = "839647521";
	console.log(perm2index_des(a));
}


function check_valid() {
    const a = document.getElementById('input').value;
    permu_n = a.length;
    if (a.length === 0){
        document.getElementById("invalid").style.display = "none";
		reset_all();
		return;
    }
    for (let i = 1; i <= a.length; i++) {
        if(a.indexOf(parseInt(i, 10)) === -1){
            document.getElementById("invalid").style.display = "block";
            reset_all();
            return;
        }
    }
    document.getElementById("invalid").style.display = "none";
    update_all(a, 'input');
}

function update_all(perm, elem) {
    document.getElementById('mid_dic').value = perm2inter_dic(perm);
	document.getElementById('mid_inc').value = perm2inter_inc(perm);
	document.getElementById('mid_des').value = perm2inter_des(perm);
	document.getElementById('mid_swap').value = perm2inter_swap(perm);
	document.getElementById('index_dic').value = perm2index_dic(perm).toString(10);
	document.getElementById('index_inc').value = perm2index_inc(perm).toString(10);
	document.getElementById('index_des').value = perm2index_des(perm).toString(10);
	document.getElementById('index_swap').value = perm2index_swap(perm).toString(10);
	document.getElementById(elem).value = perm;
}

function reset_all() {
	document.getElementById('mid_dic').value = '';
	document.getElementById('mid_inc').value = '';
	document.getElementById('mid_des').value = '';
	document.getElementById('mid_swap').value = '';
	document.getElementById('index_dic').value = '';
	document.getElementById('index_inc').value = '';
	document.getElementById('index_des').value = '';
	document.getElementById('index_swap').value = '';
}

//全排列 -> 序数
function perm2index_dic(n) {
    const inter = perm2inter_dic(n);
    let N = n.length;
	let index = 0;
	for(let i = 0; i < N-1; i++) {
		index += parseInt(inter[i]) * fac[N-1-i];
	}
    return index;
}

function perm2index_inc(n) {
    const inter = perm2inter_inc(n);
    let N = n.length;
	let index = 0;
	for(let i = 0; i < N-1; i++) {
		index += parseInt(inter[i]) * fac[N-1-i];
	}
    return index;
}

function perm2index_des(n) {
    const inter = perm2inter_des(n);
    let N = n.length;
	let c = 3;
	let index = parseInt(inter[0]) * c;
	for(let i = 1; i < N-2; i++) {
		c++;
		index = (index + parseInt(inter[i])) * c;
	}
	index += parseInt(inter[N-2]);
    return index;
}

function perm2index_swap(n) {
    const inter = perm2inter_swap(n);
    console.log(inter);
	let N = n.length;
	let c = 3;
	let index = parseInt(inter[0]) * c;
	for(let i = 1; i < N-2; i++) {
		c++;
		index = (index + parseInt(inter[i])) * c;
	}
	index += parseInt(inter[N-2]);
    return index;
}

function index2perm_dic(n) {
    //TODO
    return undefined;
}

function index2perm_inc(n) {
    //TODO
    return undefined;
}

function index2perm_des(n) {
    //TODO
    return undefined;
}

function index2perm_swap(n) {
    //TODO
    return undefined;
}

function indexed(algorithm, n) {
    var ret;
    switch (algorithm) {
        case 'dic':
            ret = index2perm_dic(n);
            break;
        case 'inc':
            ret = index2perm_inc(n);
            break;
        case 'des':
            ret = index2perm_des(n);
            break;
        case 'swap':
            ret = index2perm_swap(n);
            break;
    }
    update_all(ret.toString, 'index_'+algorithm);
    document.getElementById('input').value = ret.toString;
}


//全排列 -> 中介数
function perm2inter_dic(n) {
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

function perm2inter_inc(n) {
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

function perm2inter_des(n) {
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

function perm2inter_swap(n) {
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
			if((bk_1 + bk_2) % 2 === 1) directions[k] = 1;
		}
		let cnt = 0;
		if(directions[k] === 1) {
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

function perm2inter(algorithm, n) {
    switch (algorithm) {
        case 'dictionary':
            return perm2inter_dic(n);
        case 'increment':
            return perm2inter_inc(n);
        case 'descend':
            return perm2inter_des(n);
        case 'swap':
            return perm2inter_swap(n);
    }
}


// 中介数 -> 全排列
function inter2perm_dic(inter) {
	var N = inter.length+1;
	var p = new Array(N);
	var u = new Array(N);  //记录每一个数字是否已存在于排列中
	u.fill(0);
	for(let i = 0; i < N-1; i++) {
		let a = parseInt(inter[i]);
		let cnt = 0;
		for(let j = 0; j < N; j++) {
			if(!u[j]) cnt++;
			if(cnt === a + 1) {
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

function inter2perm_inc(inter) {
	var N = inter.length + 1;
	var p = new Array(N);
	p.fill(0);
	for(let i = 0; i < N-1; i++) {
		let cnt = 0;
		for(let j = N-1; j >= 0; j--) {
			if(p[j] === 0) cnt++;
			if(cnt === parseInt(inter[i]) + 1) {
				p[j] = (N-i).toString();
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

function inter2perm_des(inter) {
	var N = inter.length + 1;
	var p = new Array(N);
	p.fill(0);
	for(let i = N-2; i >= 0; i--) {
		let cnt = 0;
		for(let j = N-1; j >= 0; j--) {
			if(p[j] === 0) cnt++;
			if(cnt === parseInt(inter[i]) + 1) {
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

function inter2perm_swap(inter) {
	var N = inter.length + 1;
	var p = new Array(N);
	p.fill(0);
	for(let k = N; k > 1; k--) {
		let bk = parseInt(inter[k-2]);
		let bk_1 = parseInt(inter[k-3]);
		let cnt = 0;
		if(k % 2 === 1) {
			if(bk_1 % 2 === 1) {
				for(let j = 0; j < N; j++) {
					if(p[j] === 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			} else {
				for(let j = N-1; j >= 0; j--) {
					if(p[j] === 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			}
		} else {
			let bk_2 = parseInt(inter[k-4]);
			if((bk_1 + bk_2) % 2 === 1) {
				for(let j = 0; j < N; j++) {
					if(p[j] === 0) cnt++;
					if(cnt === bk + 1) {
						p[j] = k.toString();
						break;
					}
				}
			} else {
				for(let j = N-1; j >= 0; j--) {
					if(p[j] === 0) cnt++;
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


// 全排列 -> 之后第step个全排列
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
			while(inter[i] === carry[i+1]) {
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
    var intermediary = perm2inter_dic(n);
	var next_inter = get_next_intermediary(intermediary, 'inc', step);
	return inter2perm_dic(next_inter);
}

function next_permutation_inc(n, step=1) {
    var intermediary = perm2inter_inc(n);
	var next_inter = get_next_intermediary(intermediary, 'inc', step);
	return inter2perm_inc(next_inter);
}

function next_permutation_des(n, step=1) {
    var intermediary = perm2inter_des(n);
	var next_inter = get_next_intermediary(intermediary, 'des', step);
	return inter2perm_des(next_inter);
}

function next_permutation_swap(n, step=1) {
    var intermediary = perm2inter_swap(n);
	var next_inter = get_next_intermediary(intermediary, 'des', step);
	return inter2perm_swap(next_inter);
}

function next_permutation(algorithm, n, step=1) {
    switch (algorithm) {
        case 'dic':
            return next_permutation_dic(n, step);
        case 'inc':
            return next_permutation_inc(n, step);
        case 'des':
            return next_permutation_des(n, step);
        case 'swap':
            return next_permutation_swap(n, step);
    }
}





function inter(algorithm) {
    var ret;
    var mid = document.getElementById('mid_'+algorithm).value;
    if(mid.length === 0){
        reset_all();
        document.getElementById('input').value = '';
        return;
    }
    if(!check_valid_inter(mid)){
        return;
    }
    switch (algorithm) {
        case 'dic':
            ret = inter2perm_dic(mid);
            break;
        case 'inc':
            ret = inter2perm_inc(mid);
            break;
        case 'des':
            ret = inter2perm_des(mid);
            break;
        case 'swap':
            ret = inter2perm_swap(mid);
            break;
    }
    console.log(ret);
    update_all(ret.toString(10), 'mid_'+algorithm);
    document.getElementById('input').value = ret.toString(10);
}

function check_valid_inter() {
    //TODO
}