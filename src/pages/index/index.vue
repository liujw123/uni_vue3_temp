<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { deepClone } from "@/utils";
import { accAdd } from "@/utils/calculation";
import { login } from "@/api";

onLoad(() => {
	console.log('deepClone', deepClone({ a: 1, b: { c: 2 } }));
	console.log('accAdd', accAdd(0.1, 0.2));
	login({ data: { appid: 123 }, loading: '加载...'  })
	.then(res=>{
		console.log('login', res);
	})
});

</script>

<template>
	<view class="index-index">hello &#xe605;</view>
</template>

<style lang="scss" scoped>
@font-face{
    @include circleSuccess;
}
.index-index{
	text-align: center;
	@include flcw(28upx, 32upx, $mColor, 500);
	font-family: circleSuccess;
}
</style>
