<template>
  <div>
    <ve-line :data="chartData"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {}
    }
  },
  created() {
    fetch('http://123.206.55.50:15000/users/commit')
      .then(res => res.json())
      .then(body => {
        // 整理数据，把12各月份的数据合并到一个对象李
        const data = body[0].commit
        // 遍历循环数据
        data.forEach((item, index) => {
          const date = item.date
          // 循环12个月的数据
          for (var i = 1; i <= 12; i++) {
            item[`${i}月`] = body[i - 1].commit[date - 1] && body[i - 1].commit[date - 1].commit
          }

          // 删除commit;
          delete item.commit
        })
        this.chartData = {
          columns: [
            'date',
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          rows: data
        }
      })
  }
}
</script>

