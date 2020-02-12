import {
  setRule,
  initializeRender,
  selectRuleType,
  selectRuleNum,
  getRuleResult
} from "./tableRule";
import "@testing-library/jest-dom";

describe("正确显示两个select以及其下的options", () => {
  beforeEach(() => {
    window.document.body.innerHTML = `
      <select id="rule_type"></select>
      <select id="rule_num"></select>
    `;
    initializeRender();
  });

  it(`如果rule_type是"不限"，则rule_num应该是hidden，并且选择到1`, () => {
    const data = {
      rule_type: 0,
      rule_num: 1
    };
    setRule(data);
    const ruleNumSelector = window.document.getElementById("rule_num");
    expect(ruleNumSelector).not.toBeVisible();
  });
  it(`如果rule_type不是"不限",则rule_num应该可以进行下拉的选项的选择（1-10），并且可见`, () => {
    const data = {
      rule_type: 1,
      rule_num: 1
    };
    setRule(data);
    const ruleNumSelector = window.document.getElementById("rule_num");
    const ruleNumSelectorChildren = ruleNumSelector!.children;
    expect(ruleNumSelector).toBeVisible();
    expect(ruleNumSelectorChildren.length).toBe(10); // 1~10
  });
});

describe("在使用上的交互", () => {
  it(`如果选择的不是"不限", 则rule_num下拉选单取消hidden状态，并且可以进行options的选择`, () => {
    selectRuleType(1);
    const ruleNumSelector = window.document.getElementById("rule_num");
    const ruleNumSelectorChildren = ruleNumSelector!.children;
    expect(ruleNumSelector).toBeVisible();
    expect(ruleNumSelectorChildren.length).toBe(10); // 1~10
  });
  it(`非不限的情况下，选择rule_num下拉框，选择一个值，则得到这个值的结果`, () => {
    selectRuleType(2);
    const ruleNumSelector = window.document.getElementById("rule_num");
    expect(ruleNumSelector).toBeVisible();
    selectRuleNum(2);
    const result = getRuleResult();
    expect(result.rule_num).toBe(2);
  });
  it(`如果选择的是"不限"，则rule_num下拉框进入到disable状态, 得到的结果rule_type 为0 ， rule_num为1`, () => {
    selectRuleNum(10);
    selectRuleType(0);
    const ruleNumSelector = window.document.getElementById("rule_num");
    expect(ruleNumSelector).not.toBeVisible();
    const { rule_type, rule_num } = getRuleResult();
    expect(rule_type).toBe(0);
    expect(rule_num).toBe(1);
  });
});

// describe("数据结果是否正确", () => {
//   it(`rule_type="不限"，result结果为{ rule_type:0, rule_num: 1}`, () => {
//     select;
//   });
//   it.todo(
//     `rule_type为其他时，result结果为{ rule_type: {rule_type}, rule_num: 1}`
//   );
// });
