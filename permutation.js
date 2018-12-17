var permu_n = 0; //当前输入的位数

function show() {
    var a = document.getElementById('input').value;
    if (!check_valid(a))
        alert("invalid permutation")
}


function check_valid() {
    var a = document.getElementById('input').value;
    document.getElementById("title").style.display = "none";
    permu_n = a.length;
    if (a.length === 0){
        document.getElementById("next").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        document.getElementById("title").style.display = "block";
        return;
    }
    for (let i = 1; i <= a.length; i++) {
        if(a.indexOf(parseInt(i, 10)) === -1){
            document.getElementById("next").style.display = "none";
            document.getElementById("invalid").style.display = "block";
            document.getElementById("title").style.display = "block";

            return;
        }
    }
    document.getElementById("invalid").style.display = "none";
    document.getElementById("next").style.display = "block";
}

function get_index_dic(n) {
    return 0;
}

function get_index_swap(n) {
    return 0;
}

function get_index_inc(n) {
    return 0;
}

function get_index_des(n) {
    return 0;
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

}

function get_intermediary_inc(n) {

}

function get_intermediary_des(n) {

}

function get_intermediary_swap(n) {
    var directions = [];
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


function get_permutation(algorithm) {
    var ret;
    var n = document.getElementById('mid_'+algorithm).value;
    switch (algorithm) {
        case 'dic':
            ret = get_permutation_dic(n, permu_n);
            break;
        case 'inc':
            ret = get_permutation_inc(n, permu_n);
            break;
        case 'des':
            ret = get_permutation_des(n, permu_n);
            break;
        case 'swap':
            ret = get_permutation_swap(n, permu_n);
            break;
    }
    console.log(ret);
    document.getElementById('input').value = ret.toString(10);
    document.getElementById('mid_dic').value = get_index_dic(ret).toString(10);
    document.getElementById('mid_inc').value = get_index_inc(ret).toString(10);
    document.getElementById('mid_des').value = get_index_inc(ret).toString(10);
    document.getElementById('mid_swap').value = get_index_inc(ret).toString(10);
}

function get_permutation_dic(n, permu_n) {
    console.log('dic');
    return 0;

}

function get_permutation_inc(n, permu_n) {
    console.log('inc');
    return 0;

}
function get_permutation_des(n, permu_n) {
    console.log('des');
    return 0;

}
function get_permutation_swap(n, permu_n) {
    console.log('swap');
    return 0;

}