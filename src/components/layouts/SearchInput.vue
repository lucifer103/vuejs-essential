<template>
    <div class="navbar-form navbar-left hidden-sm">
        <div class="form-group">
            <input type="text" v-model.trim="searchValue" class="form-control search-input mac-style" placeholder="搜索" @keyup.enter="search" @input="updateSearchValue">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchInput',
        data() {
            return {
                value: ''   // 搜索值
            }
        },
        // 添加计算属性
        computed: {
            searchValue: {
                // getter
                get() {
                    return this.$store.state.searchValue
                },
                // setter
                set(newValue) {
                    this.value = newValue
                }
            }
        },
        methods: {
            search() {
                const value = this.value

                if (value !== '') {
                    // 跳转到搜索结果页，附带查询参数 q 作为搜索值
                    this.$router.push({ name: 'Search', query: { q: value } })
                }
            },
            // 更新 searchValue
            updateSearchValue() {
                this.$store.commit('UPDATE_SEARCH_VALUE', this.value)
            }
        }
    }
</script>

<style scoped>
    .search-input {
        background-image: url(https://cdn.learnku.com/assets/images/icon-search.png)
    }
</style>