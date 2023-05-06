package ltd.newbee.mall.controller.admin;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import ltd.newbee.mall.entity.TbConfig;
import ltd.newbee.mall.interceptor.R;
import ltd.newbee.mall.service.TbConfigService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *  前端控制器
 *
 * @author xujichuang
 * @since 2023-05-06
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/tbConfig")
public class TbConfigController {

    private final TbConfigService tbConfigService;

    /**
     * 分页列表
     *
     * @param page   分页信息
     * @return R
     */
    @GetMapping("/page")
    public R<?> page(Page<TbConfig> page) {
		return R.ok(tbConfigService.page(page));
    }

    /**
     * 信息
     *
     * @param id Id
     * @return R
     */
    @GetMapping("/get")
    public R<TbConfig> get(@RequestParam String id) {
		return R.ok(tbConfigService.getById(id));
	}

    /**
    * 新增或修改
    *
    * @param tbConfig TbConfig 对象
    * @return R
    */
    @PostMapping("/set")
    public R<?> set(@RequestBody TbConfig tbConfig) {
		return R.ok(tbConfigService.saveOrUpdate(tbConfig));
	}

    /**
    * 删除
    *
    * @param ids id字符串，根据,号分隔
    * @return R
    */
    @PostMapping("/del")
    public R<?> del(@RequestBody List<String> ids) {
		return R.ok(tbConfigService.removeByIds(ids));
	}

}

