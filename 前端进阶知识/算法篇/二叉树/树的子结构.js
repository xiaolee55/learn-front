function HasSubtree(pRoot1, pRoot2) {
  let result = false;
  if (pRoot1 && pRoot2) {
    if (pRoot1.val === pRoot2.val) {
      result = compare(pRoot1, pRoot2);
    }
    if (!result) {
      result = HasSubtree(pRoot1.right, pRoot2);
    }
    if (!result) {
      result = HasSubtree(pRoot1.left, pRoot2);
    }
  }
  return result;
}

function compare(pRoot1, pRoot2) {
  if (pRoot2 === null) {
    return true;
  }
  if (pRoot1 === null) {
    return false;
  }
  if (pRoot1.val !== pRoot2.val) {
    return false;
  }
  return compare(pRoot1.right, pRoot2.right) && compare(pRoot1.left, pRoot2.left);
}