// 冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                let tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}

// 选择排序
function selectSort(arr) {
    let len = arr.length;
    let base, tmp;
    for(let i = 0; i < len; i++) {
        base = i;
        for(let j = i + 1; j < len; j++) {
            if(arr[j] < arr[base]) {
                base = j
            }
        }
        tmp = arr[i];
        arr[i] = arr[base];
        arr[base] = tmp;
    }
    return arr;
}

// 插入排序
function insertSort(arr) {
    let len = arr.length;
    let preIndex, current;
    for(let i = 0; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

// 快速排序
function quickSort(arr) {
    if(arr.length <= 1) return arr;
    let left = [], right = [];
    let baseIndex = Math.floor(arr.length / 2);
    let base = arr.splice(baseIndex, 1)[0];;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < base) {
            left.push(arr[i])
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([base], quickSort(right));
}