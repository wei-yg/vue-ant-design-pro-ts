<template>
  <div class="step1">
    <a-form
      layout="horizontal"
      :form="form"
      style="max-width: 600px;margin:0 auto"
    >
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount || '',
              rules: [{ required: true, message: '请选择付款账户' }]
            }
          ]"
          placeholder="请选择付款账户"
        >
          <a-select-option
            v-for="item in initData.payAccounts"
            :key="item.label"
            :value="item.value"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="收款人姓名"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'userName',
            {
              initialValue: step.userName || '',
              rules: [{ required: true, message: '请选择收款人姓名' }]
            }
          ]"
          placeholder="请选择收款人姓名"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="转账金额"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'money',
            {
              initialValue: step.money || 0,
              rules: [
                {
                  required: true,
                  pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                  message: '请输入有效转账金额且金额必须大于1'
                }
              ]
            }
          ]"
          placeholder="请输入转账金额"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="备注信息"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-textarea
          v-decorator="[
            'desc',
            {
              initialValue: step.desc || ''
            }
          ]"
          :row="4"
          placeholder="此处输入备注信息"
        >
        </a-textarea>
      </a-form-item>
      <a-form-item style="text-align: right">
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ReceiverAccount from "../../../components/ReceiverAccount.vue";

@Component({ components: { ReceiverAccount } })
export default class Step1 extends Vue {
  private form: any;

  private formLayout: string = "horizontal";

  private formItemLayout: object = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  private initData: object = {
    payAccounts: [
      { value: "2904xxxx@qq.com", label: "2904xxxx@qq.com" },
      { value: "8625xxxx@qq.com", label: "8605xxxx@qq.com" }
    ]
  };

  get step() {
    return this.$store.state.form.step;
  }

  created() {
    this.form = this.$form.createForm(this);
  }

  handleSubmit() {
    const { form, $router, $store } = this;
    form.validateFields((err: Error, values: object) => {
      if (!err) {
        $store.commit({
          type: "form/saveStep1FormData",
          payload: values
        });
        $router.push("/form/step-form/confirm");
      }
    });
  }
}
</script>

<style scoped></style>
