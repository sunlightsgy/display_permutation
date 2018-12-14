function show() {
    var a = document.getElementById('input').value;
    if (!check_valid(a))
        alert("invalid permutation")
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