package ltd.newbee.mall.controller.admin;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import ltd.newbee.mall.entity.TbConfig;
import ltd.newbee.mall.interceptor.R;
import ltd.newbee.mall.service.TbConfigService;
import ltd.newbee.mall.util.PageResult;
import ltd.newbee.mall.util.Result;
import ltd.newbee.mall.util.ResultGenerator;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 *  前端控制器
 *
 * @author xujichuang
 * @since 2023-05-06
 */
@RestController
@RequestMapping("/admin")
public class TbConfigController {

    @Resource
    private TbConfigService tbConfigService;

    /**
     * 分页列表
     *
     * @param page   分页信息
     * @return R
     */
    @GetMapping("/tbConfig/page")
    public Result page(Page<TbConfig> page, HttpServletRequest request) {
        Map<String, String[]> parameterMap = request.getParameterMap();
        String[] limits = parameterMap.get("limit");
        int limit = Integer.parseInt(limits[0]);
        String[] currentPages = parameterMap.get("page");
        int currentPage = Integer.parseInt(currentPages[0]);
        page.setCurrent(currentPage);
        page.setSize(limit);

        Page<TbConfig> result = tbConfigService.page(page);

        int total = result.getRecords().size();

        PageResult pageResult = new PageResult(result.getRecords(), total, limit, currentPage);

        return ResultGenerator.genSuccessResult(pageResult);
    }

    /**
     * 信息
     *
     * @param id Id
     * @return R
     */
    @GetMapping("/tbConfig/get")
    public R<TbConfig> get(@RequestParam String id) {
		return R.ok(tbConfigService.getById(id));
	}

    @GetMapping("/tbConfig/getValue/{id}")
    public String getImg(@PathVariable String id) {
        return tbConfigService.getById(id).getConfigValue();
    }

    /**
    * 新增或修改
    *
    * @param tbConfig TbConfig 对象
    * @return R
    */
    @PostMapping("/tbConfig/set")
    public R<?> set(@RequestBody TbConfig tbConfig) {
		return R.ok(tbConfigService.saveOrUpdate(tbConfig));
	}

    /**
    * 删除
    *
    * @param ids id字符串，根据,号分隔
    * @return R
    */
    @PostMapping("/tbConfig/del")
    public R<?> del(@RequestBody List<String> ids) {
		return R.ok(tbConfigService.removeByIds(ids));
	}


}

