interface RuleOptions {
  rule_type: number;
  rule_num: number;
}

enum RuleType {
  "不限",
  "总计",
  "每天",
  "每周",
  "每月"
}

let rule_type: number = 0;
let rule_num: number = 1;

let ruleTypeEl: HTMLElement;
let ruleNumEl: HTMLElement;

const bindSelect = () => {
  $(ruleTypeEl).on("change", function(e) {
    let value = Number($(this).val());
    selectRuleType(value);
  });
  $(ruleNumEl).on("change", function(e) {
    let value = Number($(this).val());
    selectRuleNum(value);
  });
};

const unBindSelect = () => {
  $(ruleTypeEl).off("change");
  $(ruleNumEl).off("change");
};

type RuleTypeItem = keyof typeof RuleType;

const RuleTypeOptions: RuleTypeItem[] = [
  "不限",
  "总计",
  "每天",
  "每周",
  "每月"
];

const selectRuleType = (val: RuleType) => {
  rule_type = val;
  let data = {
    rule_type: rule_type,
    rule_num: rule_num
  };
  setRule(data);
};

const selectRuleNum = (val: number) => {
  rule_num = val;
  let data = {
    rule_type: rule_type,
    rule_num: rule_num
  };
  setRule(data);
};

const initializeRender = () => {
  ruleTypeEl = window.document.getElementById("rule_type") as HTMLElement;
  ruleNumEl = window.document.getElementById("rule_num") as HTMLElement;
  renderRuleType();
  renderRuleNum();
};

const renderRuleType = () => {
  const ruleOptionsHtmlArr = RuleTypeOptions.map(opt => {
    return `<option value="${RuleType[opt]}">${opt}</option>`;
  });
  ruleTypeEl.innerHTML = ruleOptionsHtmlArr.join("\n");
};

const renderRuleNum = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ruleNumOptionsArr = nums.map(n => {
    return `<option value="${n}">${n}次</option>`;
  });
  ruleNumEl.innerHTML = ruleNumOptionsArr.join("\n");
};

const setRule = (options: RuleOptions): void => {
  const { rule_type, rule_num } = options;
  setRuleType0(rule_type);
  setRuleNoneType0(rule_type);
};

// 选择不限
const setRuleType0 = (rule_type: RuleType) => {
  if (rule_type === 0) {
    ruleNumEl.style.display = "none";
    rule_num = 1;
  }
};

const setRuleNoneType0 = (rule_type: RuleType) => {
  rule_type && (ruleNumEl.style.display = "inline-block");
};

const getRuleResult = (): RuleOptions => {
  return {
    rule_type: rule_type,
    rule_num: rule_num
  };
};

export {
  setRule,
  initializeRender,
  bindSelect,
  selectRuleNum,
  selectRuleType,
  getRuleResult,
  unBindSelect
};
