/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i = 0, l = nums.length; i < l; i++) {
        for(let j = i + 1; j < l; j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 在LeetCode部分用例未通过，因为数字过大时会自动使用科学计数法计算就出错了。。。
var addTwoNumbers = function(l1, l2) {
    let num1 = trans(l1);
    let num2 = trans(l2);
    console.log(num1 + num2, (num1 + num2).toLocaleString());
    let sumStr = (num1 + num2).toLocaleString().replace(/,/g, '');
    let tmpArr = sumStr.split('').reverse();
    console.log('aaaa---', num1, num2, sumStr);
    let node = new ListNode(tmpArr[0]);
    create(node, tmpArr, 0);
    return node;
};
function create(node, arr, i) {
    console.log(node, i);
    if(i === arr.length -1) {
        node.next = null;
    } else {
        node.next = new ListNode(arr[++i]);
        create(node.next, arr, i)
    }
}

function ListNode(val) {
    this.val = val;
    this.next = null;
}
var trans = function(node) {
    let arr = [];
    let _node = node;
    while(_node) {
        arr.unshift(_node.val);
        _node = _node.next;
    }
    return parseInt(arr.join(''));
}