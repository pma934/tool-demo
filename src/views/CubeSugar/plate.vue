<template>
    <div>
        <!-- <sugar-group :groupList="[8, 12, 5, 12, 1, 2, 19, 9, 6]"></sugar-group> -->
        <el-button v-loading="progress > 0" v-for="level in showLevel" :key="level" @click="test(level)"
            :disabled="totalSugar < level * 9">{{
                text[level - 1] }}计算</el-button>
        <el-button type="primary" @click="clearOrInterrupt">清除/中断</el-button>
        <el-card class="list-card">
            <template v-if="progress > 0">
                <el-progress type="circle" :percentage="+progress.toFixed(1)"></el-progress>
                <!-- <p>当前计算进度：{{ progress.toFixed(1) }}%</p> -->
            </template>
            <template v-if="count > 0">
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="i in count" :key="i" class="infinite-list-item">
                        <el-button :type="selected === solutions[i - 1] ? 'warning' : 'primary'"
                            @click="select(solutions[i - 1])">{{ solutions[i - 1] }}</el-button>
                    </li>
                </ul>
            </template>
        </el-card>
        <div v-if="selected">
            <p>已选择：{{ selected }}</p>
            <div class="selected">
                <sugar-group v-for="(list, index) in selected" :key="index"
                    :groupList="getGroupList(list)"></sugar-group>
            </div>
            <p>剩余：{{ remainingSugar }}</p>
            <div v-if="remainingSugarCount >= 9">
                <plate :sugarNumbers="remainingSugar"></plate>
            </div>
        </div>
    </div>
</template>

<script>
import { findPlateSolutions } from './const'
import sugarGroup from './sugarGroup.vue'
import typeMap from './bottom_left_data2.json'
import plate from './plate.vue'

export default {
    name: 'plate',
    components: {
        sugarGroup,
        plate,
    },
    props: {
        sugarNumbers: {
            type: Array,
            default() {
                return new Array(19).fill(0)
            }
        },
        showLevel: {
            type: Array,
            default() {
                return [1, 2, 3]
            }
        }
    },
    data() {
        return {
            text: ['一阶', '二阶', '三阶'],
            solutions: [],
            count: 0,
            selected: null,
            progress: 0,
            stop: null
        }
    },
    computed: {
        totalSugar() {
            return this.sugarNumbers.reduce((acc, cur) => acc + cur, 0)
        },
        // 剩余的sugarNumbers数组
        remainingSugar() {
            if (!this.selected) return this.sugarNumbers;

            // 创建一个sugarNumbers的副本，用于计算剩余数量
            const remaining = [...this.sugarNumbers];

            // 遍历选中的每个盘子组合
            this.selected.forEach(plate => {
                // 获取该盘子包含的方糖类型列表
                const typeList = this.getGroupList(plate);

                // 遍历每个类型，从剩余数量中减去1
                typeList.forEach(type => {
                    // 类型从1开始，所以索引需要减1
                    if (type >= 1 && type <= 19) {
                        remaining[type - 1] = Math.max(0, remaining[type - 1] - 1);
                    }
                });
            });

            return remaining;
        },
        // 剩余的方糖数量
        remainingSugarCount() {
            return this.remainingSugar.reduce((acc, cur) => acc + cur, 0)
        },
    },
    methods: {
        getGroupList(plate) {
            console.log(plate)
            let key = plate.toString()
            return typeMap[key].split(',').map(Number)
        },
        select(solution) {
            this.selected = solution
        },
        clearOrInterrupt() {
            if (this.progress > 0) {
                this.stop && this.stop()
            } else {
                this.clear()
            }
        },
        clear() {
            this.solutions = []
            this.count = 0
            this.selected = null
            this.progress = 0
            this.stop = null
        },
        async test(targetOrder = 1) {
            this.clear()
            const input = this.sugarNumbers.join(',');
            try {
                console.time()
                const solutions = await findPlateSolutions(input, targetOrder, (progress) => {
                    console.log(`计算进度：${progress.toFixed(1)}%`);
                    this.progress = progress
                }, f => this.stop = f).catch(e => {
                    console.error(e)
                    if (e === 'too large') {
                        this.$message.warning("计算量过大，请尝试降阶，分步计算");
                    } else {
                        this.$message.warning("计算中断！");
                    }
                    this.clear()
                });
                if (solutions) {
                    if (solutions.length) {
                        this.$message.success(`找到 ${solutions.length} 种${targetOrder}阶可行组合：`);
                        console.timeEnd()
                        this.solutions = solutions
                        this.count = 1
                        requestAnimationFrame(() => {
                            this.progress = 0
                        })
                        this.stop = null
                        console.log(solutions)
                    } else {
                        this.$message.warning(`未找到${targetOrder}阶可行组合`);
                        this.clear()
                    }
                }
            } catch (error) {
                console.error("??出错：", error);
                this.clear()
            }
        },
        load() {
            if (this.count >= this.solutions.length) return
            this.count += 10
            this.count = Math.min(this.count, this.solutions.length)
        }
    },
    destroyed() {
        this.clear()
    },
    watch: {
        sugarNumbers: {
            handler(newVal, oldVal) {
                console.log('sugarNumbers 变化了', newVal, oldVal);
                this.clearOrInterrupt()
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.list-card {
    width: 840px;
    height: 340px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list {
    max-height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;

    .infinite-list-item {
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.selected {
    margin-top: 20px;
    display: flex;
    gap: 20px;
}
</style>
