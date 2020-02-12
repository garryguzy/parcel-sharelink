import { initializeRender, setRule, bindSelect } from "./tableRule";

initializeRender();

const data = { rule_type: 0, rule_num: 1 };

setRule(data);

bindSelect();
