package ltd.newbee.mall.controller.mall;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import ltd.newbee.mall.entity.TbMessage;
import ltd.newbee.mall.interceptor.R;
import ltd.newbee.mall.service.TbMessageService;
import ltd.newbee.mall.util.PageQueryUtil;
import ltd.newbee.mall.util.PageResult;
import ltd.newbee.mall.util.Result;
import ltd.newbee.mall.util.ResultGenerator;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *  前端控制器
 *
 * @author xujichuang
 * @since 2023-05-04
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/tbMessage")
public class TbMessageController {

    private final TbMessageService tbMessageService;

    /**
     * 分页列表
     *
     * @param page   分页信息
     * @return R
     */
    @GetMapping("/page")
    public Result page(Page<TbMessage> page) {
        Page<TbMessage> result = tbMessageService.page(page);
        PageResult pageResult = new PageResult(result.getRecords(), (int) result.getTotal(), (int) page.getSize(), (int) page.getPages());

        return ResultGenerator.genSuccessResult(pageResult);
    }

    /**
     * 信息
     *
     * @param id Id
     * @return R
     */
    @GetMapping("/get")
    public Result get(@RequestParam String id) {
		return ResultGenerator.genSuccessResult(tbMessageService.getById(id));
	}

    /**
    * 新增或修改
    *
    * @param tbMessage TbMessage 对象
    * @return R
    */
    @PostMapping("/set")
    public Result set(@RequestBody TbMessage tbMessage) {
		return ResultGenerator.genSuccessResult(tbMessageService.saveOrUpdate(tbMessage));
	}

    /**
    * 删除
    *
    * @param ids id字符串，根据,号分隔
    * @return R
    */
    @PostMapping("/del")
    public Result del(@RequestBody List<String> ids) {
		return ResultGenerator.genSuccessResult(tbMessageService.removeByIds(ids));
	}

}

